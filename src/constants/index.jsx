import { GiForkKnifeSpoon ,GiCoffeeCup} from "react-icons/gi";
import { FaBicycle } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";

export const CardInfo = [
  {
    id: 1,
    logo: <GiForkKnifeSpoon className="text-5xl text-gray-400"/>,

    title: "DAILY NEW, FRESH MENUS",
    desc: {
      d1: "Our chefs use fresh, seasonal",
      d2: "ingredients to make affordable,",
      d3: "tasty, nourishing meals.",
    },
    btn: "See Menu",
    path:'/menu',
    
  },
  {
    id: 2,
    logo: <FaBicycle className="text-5xl text-gray-400"/>,

    title: "WE DELIVER TO YOUR HOME",
    desc: {
      d1: "Order healthy food on-demand",
      d2: "or schedule delivery up to a",
      d3: "week in advance.",
    },
    btn: "Order Now",
    path:'/menu',
    
  },

  {
    id: 3,
    logo: <GiCoffeeCup className="text-5xl text-gray-400"/>,

    title: "OUR COFFEE",
    desc: {
      d1: "Have you tasted our Ethiopian",
      d2: "natural Yirgacheffe yet",
      d3: "think it’s rather special.",
    },
    btn: "more info",
    path:'/coffe',
    
  },
  {
    id: 4,
    logo: <SlCalender className="text-5xl text-gray-400" />,

    title: "UPCOMING EVENTS",
    desc: {
      d1: "Join us for our annual summer",
      d2: "BBQ and enjoy good food and",
      d3: "even better company.",
    },
    btn: "all events",
    path:'/events',
    


  },
];
export const footerLinks=[
  {
      id:1,
      title:"Services",
      links:[
          {
              id:10,
              title:"Design",

          },
          {
              id:11,
              title:"Development",

          },
          {
              id:12,
              title:"Marketing",

          },
          {
              id:13,
              title:"Consulting",

          },
          {
              id:14,
              title:"Finance",

          },
      ]
  },
  {
      id:2,
      title:"Useful Links",
      links:[
          {
              id:20,
              title:"About",
              path:"/about"

          },
          {
              id:21,
              title:"Product",
              path:"/product"

          },
          {
              id:22,
              title:"Contact",
              path:"/contact"

          },
          {
              id:23,
              title:"Free quote",
              path:"/"

          },
         
      ]
  },
  {
      id:3,
      title:"Address",
      links:[
          {
              id:30,
              title:"200,D-block,Green lane USA",

          },
          {
              id:31,
              title:"+10 367 467 8934",

          },
          {
              id:32,
              title:"docmed@contact.com",

          },
          
      ]
  },
]
