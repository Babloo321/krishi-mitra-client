const FarmerTable = () => {
  const farmers = [
    { name: "Ravi", product: "Tomatoes", status: "Pending", loan: "₹5000", due: "2025-07-10" },
  ];

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left bg-green-200">
          <th className="py-2 px-3">Name</th>
          <th className="py-2 px-3">Product</th>
          <th className="py-2 px-3">Status</th>
          <th className="py-2 px-3">Loan</th>
          <th className="py-2 px-3">Due Date</th>
        </tr>
      </thead>
      <tbody>
        {farmers.map((f, i) => (
          <tr key={i} className="bg-white even:bg-green-50 hover:bg-green-100 transition-all">
            <td className="py-2 px-3">{f.name}</td>
            <td className="py-2 px-3">{f.product}</td>
            <td className="py-2 px-3">{f.status}</td>
            <td className="py-2 px-3">{f.loan}</td>
            <td className="py-2 px-3">{f.due}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FarmerTable;
