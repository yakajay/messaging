import { useState } from "react";
import ChatsList from "../ChatsList";
import { LogOut } from "lucide-react";

const SidebarSkeleton = () => {
    const [showGroupModal, setShowGroupModal] = useState(false);
    const { logout } = useAuthStore();
  return (
    <>
        <aside className="h-full w-20 lg:w-72 border-y border-base-300 flex flex-col transition-all duration-200">
            <div className="border-b border-base-300 w-full p-5">
                <div className="flex item-center gap-2">
                    <Users className="size-6" />
                    <span className="font-medium hidden lg:block">Contacts</span>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto w-full py-3">
                <ChatsList/>
            </div>

            <div className="p-4 border-t border-base-300">
                <button onClick={logout} className="flex items-center gap-2 text-error hover:bg-base-200 w-full p-2 rounded" >
                    <LogOut className="size-5" />
                    <span className="hidden lg:block">Lgout</span>
                </button>
            </div>
        </aside>

        {showGroupModal && <CreateGroupModal onClose={() => setShowGroupModal(false)} />}
    </>
  );
};

export default SidebarSkeleton
