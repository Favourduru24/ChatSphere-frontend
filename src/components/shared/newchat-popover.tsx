import { ArrowLeft, Camera, Loader2, Plus, Users2Icon } from 'lucide-react';
import Search from './search';
import { useEffect, useState } from 'react';
import { useChat } from '@/hooks/use-chat';
import type { UserType } from '@/types/auth.type';
import { userData } from '@/constants';
// import type { UserType } from '@/types/user.type';

interface PropsType {
  currentUserId: string;
  open: boolean;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  isUsersLoading: boolean;
  chatModalRef: React.RefObject<HTMLDivElement>;
  isGroupOpen: boolean;
  createGroupModal: boolean;
  toggleCreateGroup: () => void;
  setIsGroupOpen: (v: boolean) => void;
  onRoute: (id: string) => void;
}

const NewChat = ({
  currentUserId,
  open,
  searchQuery,
  setSearchQuery,
  isUsersLoading,
  chatModalRef,
  isGroupOpen,
  createGroupModal,
  toggleCreateGroup,
  setIsGroupOpen,
  onRoute
}: PropsType) => {

  const [users, setUsers] = useState<UserType[]>([]);
  const [selectedUser, setSelectedUser] = useState<string[]>([]);
  const [groupName, setGroupName] = useState('');
  const { fetchAllUser, createChat } = useChat();

  useEffect(() => {
    const load = async () => {
      const res = await fetchAllUser();
      setUsers(res || []);
    };
    load();
  }, [fetchAllUser]);

  const toggleUserSelection = (id: string) => {
    setSelectedUser(prev =>
      prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]
    );
  };

  const filteredUsers = userData.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateGroup = async () => {
    // if (!groupName.trim() || selectedUser.length === 0) return;
    // await createChat({
    //   isGroup: true,
    //   participants: selectedUser,
    //   groupName
    // });

    console.log({groupName, selectedUser})
  };

  console.log({selectedUser})

  return (
    <>
      {open && (
        <div className="absolute top-20 left-1/2 max-w-[350px] w-full bg-white border rounded-lg shadow-lg flex flex-col h-[85%] min-h-0 z-20" ref={chatModalRef}>

          {/* GROUP CONTACTS */}
          {isGroupOpen && (
            <div className="absolute inset-0 bg-white flex flex-col min-h-0 rounded-lg">
              <div className="px-3 py-3 border-b flex items-center gap-3">
                <button onClick={() => setIsGroupOpen(false)} className="p-2">
                  <ArrowLeft className="size-5" />
                </button>
                <h3 className="text-lg font-semibold">Select members</h3>
              </div>

              <div className="px-4 pt-3">
                <Search placeholder="Search" value={searchQuery} setChange={setSearchQuery} />
              </div>

              <div className="flex-1 overflow-y-auto chat-scroll">
                {filteredUsers.map(user => (
                  <label key={user.id} className="flex justify-between px-4 py-3 items-center hover:bg-gray-50 cursor-pointer">
                    <div className="flex gap-3 items-center">
                      <div className="w-12 h-12 rounded-full bg-purple-200" />
                       <div className='flex flex-col gap-1'>
                      <p className='font-semibold text-sm'>{user.name}</p>
                      <p className='text-xs text-gray-500'>Hi There! Using Chatsphere.</p>
                       </div>
                    </div>
                    <input
                      type="checkbox"
                      className="size-3 accent-purple-300"
                      checked={selectedUser.includes(user.id)}
                      onChange={() => toggleUserSelection(user.id)}
                    />
                  </label>
                ))}
              </div>

              <div className="p-3 border-t flex gap-2">
                <button className="w-full py-2 bg-purple-600 text-white rounded-md" onClick={toggleCreateGroup}>
                  Next
                </button>
                <button className="w-full py-2 bg-gray-200 rounded-md" onClick={() => setIsGroupOpen(false)}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* GROUP NAME MODAL */}
          {createGroupModal && (
            <div className="absolute inset-0 bg-white flex flex-col ">
              <div className="px-4 py-3 border-b flex gap-3 items-center">
                <button onClick={toggleCreateGroup}>
                  <ArrowLeft className="size-5" />
                </button>
                <h3 className="text-lg font-semibold">Group name</h3>
              </div>

              <div className="flex-1 p-4">
                <input
                  className="w-full border p-2 rounded"
                  placeholder="Enter group name"
                  value={groupName}
                  onChange={e => setGroupName(e.target.value)}
                />
              </div>

              <div className="p-3 border-t">
                <button className="w-full py-2 bg-purple-600 text-white rounded-sm" onClick={handleCreateGroup}>
                  Create Group
                </button>
              </div>
            </div>
          )}

          {/* DEFAULT NEW CHAT */}
          {!isGroupOpen && !createGroupModal && (
            <>
              <div className="px-4 py-3 border-b flex justify-between items-center">
                <h2 className="text-lg font-semibold">New Chat</h2>
                <button onClick={() => setIsGroupOpen(true)}>
                  <Users2Icon className="size-5" />
                </button>
              </div>

              <div className="px-4 py-2 border-b">
                <input
                  className="w-full outline-none"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex-1 overflow-y-auto chat-scroll">
                {filteredUsers.map(user => (
                  <div
                    key={user.id}
                    onClick={() => onRoute(user.id)}
                    className="flex px-4 py-3 items-center gap-3 cursor-pointer hover:bg-gray-50"
                  >
                    <div className="w-12 h-12 bg-purple-200 rounded-full" />
                     <div className='flex flex-col gap-1'>
                    <p className='text-sm font-semibold'>{user.name}</p>
                    <p className='text-xs text-gray-500'>Hi There! Using Chatsphere.</p>
                     </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default NewChat;
