import { useOutletContext } from "react-router-dom";

export default function TIAView() {
  const { searchQuery } = useOutletContext();
  const mockTIAs = [
    { id: 1, title: 'Poland Cloud Hosting Assessment', country: 'Poland', status: 'Pending Review', date: '2026-04-05' },
    { id: 2, title: 'Latvia Data Center Transfer', country: 'Latvia', status: 'Approved', date: '2026-03-20' },
  ];

  return (
    <div className="w-full h-full pb-10 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-sans font-bold text-heading">Transfer Impact Assessments (TIAs)</h1>
          <p className="text-gray-400 mt-2">Manage and review cross-border data transfers.</p>
        </div>
        <button className="bg-vastintPrimary text-white px-4 py-2 rounded-lg hover:bg-vastintPrimary/90 transition-colors font-medium text-sm">
          New TIA
        </button>
      </div>

      <div className="bg-[#2c3338] rounded-xl shadow-sm border border-[#444] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#23282d] border-b border-[#444]">
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Title</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Destination</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#444]">
            {mockTIAs.filter((tia) => {
              const q = searchQuery.toLowerCase();
              return !q || tia.title.toLowerCase().includes(q) || tia.country.toLowerCase().includes(q) || tia.status.toLowerCase().includes(q);
            }).map((tia) => (
              <tr key={tia.id} className="hover:bg-[#3a3f44] transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-white">{tia.title}</td>
                <td className="px-6 py-4 text-sm text-gray-300">{tia.country}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${tia.status === 'Approved' ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'}`}>
                    {tia.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">{tia.date}</td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <button className="text-vastintPrimary hover:text-vastintPrimary/80">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
