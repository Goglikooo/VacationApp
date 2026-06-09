import { Button } from "@/components/ui/button";

const Sidebar = () => (
  <div className="pl-10 pr-10">
    <div className="app logo with name">
      <div className="flex gap-2 justify-left items-center">
        <div>Logo</div>
        <div>
          <h1>Vacation App</h1>
          <Button>Goga</Button>
        </div>
      </div>
    </div>
    <div>Navigation</div>
    <div>Admin</div>
    <div>Settings</div>
  </div>
);

export default Sidebar;
