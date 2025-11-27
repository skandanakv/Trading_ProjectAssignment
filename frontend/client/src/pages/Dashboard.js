// src/pages/Dashboard.js
import { useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // mock current prices used to calculate PnL
  const currentPrices = {
    BTC: 62000,
    ETH: 3500,
    SOL: 60,
  };

  // Called when the user clicks "Connect Broker"
  const connectBroker = async () => {
    setError("");
    setLoading(true);
    setData(null);

    const token = localStorage.getItem("token");
    const broker_userId = localStorage.getItem("broker_userId");
    const broker_password = localStorage.getItem("broker_password");

    if (!token) {
      setError("Not authenticated. Please login.");
      setLoading(false);
      return;
    }

    if (!broker_userId || !broker_password) {
      setError("Broker credentials not found. Please register or enter credentials.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/connect-broker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ broker_userId, broker_password }),
      });

      if (res.status === 401) {
        setError("Invalid broker credentials. Please check and try again.");
        setLoading(false);
        return;
      }

      if (res.status === 400) {
        const body = await res.json();
        setError(body.error || "Bad request");
        setLoading(false);
        return;
      }

      if (!res.ok) {
        setError("Failed to connect to broker. Server error.");
        setLoading(false);
        return;
      }

      const result = await res.json();
      console.log("Broker response:", result); // debug
      setData(result);
    } catch (err) {
      console.error(err);
      setError("Network or server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const calculatePNL = (holding) => {
    const current = currentPrices[holding.name] ?? 0;
    return (current - holding.avgPrice) * holding.qty;
  };

  const calculatePNLPercentage = (holding) => {
    const current = currentPrices[holding.name] ?? 0;
    if (!holding.avgPrice) return 0;
    return ((current - holding.avgPrice) / holding.avgPrice) * 100;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    
    window.location.href = "/login";
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          
          <div className="dashboard-actions">
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
            <button onClick={connectBroker} className="btn-connect">
              Connect Broker
            </button>
          </div>
        </div>

        {loading && <div className="loading-message">Loading...</div>}
        {error && <div className="error-message">{error}</div>}

        {data && (
          <>
            <div className="balance-card">
              <h2>Available Balance</h2>
              <div className="balance-amount">₹{data.balance.toLocaleString()}</div>
            </div>

            <div className="holdings-card">
              <h2>Holdings</h2>
              <table className="holdings-table">
                <thead>
                  <tr>
                    <th>Asset</th>
                    <th>Quantity</th>
                    <th>Avg Price</th>
                    <th>Current Price</th>
                    <th>PnL</th>
                    <th>PnL %</th>
                  </tr>
                </thead>
                <tbody>
                  {data.holdings.map((h, idx) => {
                    const pnl = calculatePNL(h);
                    const pnlPercent = calculatePNLPercentage(h);
                    const current = currentPrices[h.name] ?? "N/A";

                    return (
                      <tr key={idx}>
                        <td className="asset-name">{h.name}</td>
                        <td>{h.qty}</td>
                        <td>₹{h.avgPrice.toLocaleString()}</td>
                        <td>{current !== "N/A" ? `₹${current.toLocaleString()}` : current}</td>
                        <td className={pnl >= 0 ? "pnl-positive" : "pnl-negative"}>
                          ₹{Number(pnl).toFixed(2)}
                        </td>
                        <td className={pnlPercent >= 0 ? "pnl-positive" : "pnl-negative"}>
                          {Number(pnlPercent).toFixed(2)}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}

        {!data && !loading && !error && (
          <div className="empty-state">
            Click "Connect Broker" to fetch your balance and holdings.
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
