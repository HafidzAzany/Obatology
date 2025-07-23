// import React from "react";
// import { users } from "../data/users"; // pastikan path benar

// export default function ListUser() {
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Data User Klinik</h1>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white rounded shadow">
//           <thead>
//             <tr className="bg-blue-600 text-white text-left">
//               <th className="py-3 px-4">No</th>
//               <th className="py-3 px-4">Nama</th>
//               <th className="py-3 px-4">Email</th>
//               <th className="py-3 px-4">Role</th>
//               <th className="py-3 px-4">No HP</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user, index) => (
//               <tr key={user.id} className="border-b hover:bg-gray-100">
//                 <td className="py-2 px-4">{index + 1}</td>
//                 <td className="py-2 px-4">{user.name}</td>
//                 <td className="py-2 px-4">{user.email}</td>
//                 <td className="py-2 px-4">{user.role}</td>
//                 <td className="py-2 px-4">{user.phone}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
