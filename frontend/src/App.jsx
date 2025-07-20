
import {Routes, Route } from "react-router-dom";
import toast from "react-hot-toast";

import TableDashboard from "./pages/TableDashboard";
import NewTable from "./pages/NewTable";
import EditTable from "./pages/EditTable";

import OrderDashboard from "./pages/OrderDashboard";
import NewOrder from "./pages/NewOrder";
import EditOrder from "./pages/EditOrder";
import Homepage from "./pages/Homepage";
import MergeSplitTables from "./pages/MergeSplitTables";

const App = () => {
  return (
    <div data-theme="autumn" className="bg-rose-50">
      <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/tables" element={<TableDashboard />} />
            <Route path="/tables/new" element={<NewTable />} />
            <Route path="/tables/edit/:id" element={<EditTable />} />

            <Route path="/orders" element={<OrderDashboard />} />
            <Route path="/orders/new" element={<NewOrder />} />
            <Route path="/orders/edit/:id" element={<EditOrder />} />
            <Route path="/merge-split-tables" element={<MergeSplitTables />} />
       
            
            {/* Fallback route */}
      </Routes>
    </div>
  );
};

export default App;
