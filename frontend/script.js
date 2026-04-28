const API = "https://laundrydesk-backend.onrender.com/api";

const priceMap = {
  Shirt: 50,
  Pants: 80,
  Saree: 120,
  TShirt: 40
};

document.querySelector(".type").addEventListener("input", (e) => {
  const type = e.target.value;
  if (priceMap[type]) {
    document.querySelector(".price").value = priceMap[type];
  }
});

async function loadOrders(url = `${API}/orders`) {
  const res = await fetch(url);
  const orders = await res.json();
  document.querySelectorAll(".column").forEach(col => {
    col.innerHTML = `<h3>${col.id}</h3>`;
  });

  if (orders.length === 0) {
    document.getElementById("RECEIVED").innerHTML += "<p>No orders</p>";
    return;
  }

  orders.forEach(order => {
    const div = document.createElement("div");
    div.className = "order";

    div.innerHTML = `
      <strong>${order.customerName}</strong><br/>
      ₹${order.totalAmount}<br/>
      <small>${order.orderId}</small><br/><br/>

      <!-- STATUS -->
      <select onchange="changeStatus('${order._id}', this.value)">
        <option disabled selected>Change Status</option>
        <option value="PROCESSING">Processing</option>
        <option value="READY">Ready</option>
        <option value="DELIVERED">Delivered</option>
      </select>

      <br/><br/>

      <!-- PAYMENT -->
      <select onchange="changePayment('${order._id}', this.value)">
        <option value="PENDING" ${order.paymentStatus === "PENDING" ? "selected" : ""}>Pending</option>
        <option value="PAID" ${order.paymentStatus === "PAID" ? "selected" : ""}>Paid</option>
      </select>

      <br/><br/>
    `;

    document.getElementById(order.status).appendChild(div);
  });
}

async function changeStatus(id, newStatus) {
  try {
    const res = await fetch(`${API}/orders/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.msg || "Invalid transition");
      return;
    }

    loadOrders();
  } catch (err) {
    console.error(err);
    alert("Error updating status");
  }
}

async function changePayment(id, status) {
  try {
    await fetch(`${API}/orders/${id}/payment`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });

    loadOrders();
  } catch (err) {
    console.error(err);
    alert("Error updating payment");
  }
}

document.getElementById("orderForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;

  if (!/^\d{10}$/.test(phone)) {
    alert("Enter valid 10-digit phone number");
    return;
  }

  const type = document.querySelector(".type").value;
  const quantity = Number(document.querySelector(".qty").value);
  const price = Number(document.querySelector(".price").value);

  if (!type || quantity <= 0 || price <= 0) {
    alert("Enter valid garment details");
    return;
  }

  const garments = [{ type, quantity, price }];

  try {
    const res = await fetch(`${API}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: name,
        phone,
        garments
      })
    });

    const data = await res.json();
    console.log("Created:", data);

    document.getElementById("orderForm").reset();
    loadOrders();

  } catch (err) {
    console.error(err);
    alert("Error creating order");
  }
});

function applyFilters() {
  const name = document.getElementById("searchName").value;
  const status = document.getElementById("statusFilter").value;

  let url = `${API}/orders?`;

  if (name) url += `customerName=${name}&`;
  if (status) url += `status=${status}`;

  loadOrders(url);
}

loadOrders();