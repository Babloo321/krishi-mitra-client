const BuyerTable = () => {
  const buyers = [
    { name: "AgroCorp", query: "Is pesticide organic?", product: "Fertilizer" },
  ];

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left bg-blue-200">
          <th className="py-2 px-3">Buyer</th>
          <th className="py-2 px-3">Product</th>
          <th className="py-2 px-3">Query</th>
        </tr>
      </thead>
      <tbody>
        {buyers.map((b, i) => (
          <tr key={i} className="bg-white even:bg-blue-50 hover:bg-blue-100 transition-all">
            <td className="py-2 px-3">{b.name}</td>
            <td className="py-2 px-3">{b.product}</td>
            <td className="py-2 px-3">{b.query}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BuyerTable;
