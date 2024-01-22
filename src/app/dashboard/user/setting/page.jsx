import UploadProfile from "@/components/dashboard/user/UploadProfile";

const Settings = () => {
  return (
    <>
      <main className="flex p-4">
        <div className="flex-1  flex flex-col gap-4">
         <UploadProfile/>
          <div>2</div>
        </div>
        <div className="flex-1">right</div>
      </main>
    </>
  );
};

export default Settings;
