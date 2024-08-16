import React,{useState} from "react";
import { toggleSubscriptions } from "../store/Slices/subscriptionsSlice";
import { Button } from "../components";
import { useDispatch } from "react-redux";

const ManageSubscriberCard = ({
    avatar,
    fullName,
    username,
    SubscriptionCount,
    channelId
}) => {
    const [localIsSubscribed, setlocalIsSubscribed] = useState(true);
    const dispatch = useDispatch();
  return (

    <>
      <div className="flex flex-row ">
        {/* avatar container */}
        <div className="flex flex-row w-[30%] md:w-[40%]  justify-center ">
          <img src={avatar} className="w-[100px] h-[100px]   md:w-[136px] md:h-[136px] rounded-full" />
        </div>
        {/* channel info container */}
        <div className=" w-[30%] md:w-[40%] ml-3 flex items-center ">
          <div>
            <h1 className="text-white text-[16px] md:text-[18px] font-semibold ">
              {fullName}
            </h1>
            <span className="text-[#AAAAAA] mt-2 text-[12px]">{`@${username} . ${SubscriptionCount} ${
              SubscriptionCount > 1
                ? "subscribers"
                : "subscriber"
            }`}</span>
          </div>
        </div>
        {/* subscribe button */}
        <div
          className=" w-[15%] flex justify-center items-center  ml-3 sm:ml-0"
          onClick={(e) => {
            e.stopPropagation();
            setlocalIsSubscribed((prev) => !prev);
            dispatch(toggleSubscriptions({channelId}))
          }}
        >
          <Button className="text-white font-bold text-[14px] bg-purple-500 border-none outline-none h-[36px]  sm:w-[120px] rounded-full sm:p-0 p-1">
            {localIsSubscribed ? "Subscribed" : "Subscribe"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ManageSubscriberCard;
