const SOSButton = () => {
  const handleSOS = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/sos`, {
      method: 'POST'
    });
    const data = await res.json();
    alert(data.msg || data.error);
  };

  return <button onClick={handleSOS} style={{ backgroundColor: 'red', color: 'white' }}>🚨 SOS</button>;
};

export default SOSButton;
