// 

import {HiSquares2X2,HiChatBubbleLeft, HiUser,HiChartPie,HiFolder,HiShoppingCart,HiHeart,HiCog6Tooth} from "react-icons/hi2"
export const data = [{
        id: "dashboard",
        title: "Dashboard",
        icon: HiSquares2X2,

        hover: "Dashboard",
        path:"/user"

    },
    // {
    //     id: "user",
    //     title: "User",
    //     icon: HiUser,

    //     hover: "User",
    //     path:"user/myorder"

    // },
    // {
    //     id: "message",
    //     title: "Message",
    //     icon: HiChatBubbleLeft,

    //     hover: "Message",
    //     path:"/message"

    // },
    // {
    //     id: "analytic",
    //     title: "Analytic",
    //     icon: HiChartPie,

    //     hover: "Analytic",
    //     path:"/analytic"

    // // },
    // {
    //     id: "file",
    //     title: "File Manager",
    //     icon: HiFolder,

    //     hover: "Files",
    //     path:"/file"

    // },
    {
        id: "order",
        title: "Order",
        icon: HiShoppingCart,

        hover: "Order",
        path:"/user/myorder"

    },
    {
        id: "saved",
        title: "Saved",
        icon: HiHeart,

        hover: "Saved",
        path:"/user/saved"

    },
    {
        id: "setting",
        title: "Setting",
        icon: HiCog6Tooth,

        hover: "Setting",
        path:"/user/setting"

    },

]