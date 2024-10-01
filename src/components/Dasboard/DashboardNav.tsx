import { ProfileDropDown } from "../common/ProfileDropDown";

export default function DashboardNav({ email }: { email: string }) {
  // dashboard-sidebar
  const HandleSideBarTrigger = () => {
    const sidebar = document.querySelector(".dashboard-sidebar");
    sidebar?.classList.toggle("translate-x-0");
  };

  return (
    <div className="dashboard-nav">
      <div
        onClick={HandleSideBarTrigger}
        className="triger block md:hidden cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-align-left">
          <line x1={21} x2={3} y1={6} y2={6} />
          <line x1={15} x2={3} y1={12} y2={12} />
          <line x1={17} x2={3} y1={18} y2={18} />
        </svg>
      </div>
      <div className="links flex flex-col gap-1 ">
        <p className="md:text-lg flex items-center gap-1 ">
          Hello, <span className="text-yellow-text">{email.split("@")[0]}</span>
          <span>&#128075;</span>
        </p>
        <p className="text-low-white font-normal ">
          Track your orders and contact us from here
        </p>
      </div>
      <div className="flex gap-3">
        <ProfileDropDown dashboard={true} email={email} />
      </div>
    </div>
  );
}
