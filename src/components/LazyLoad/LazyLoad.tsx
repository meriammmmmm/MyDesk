// import { useEffect } from "react";
// import NProgress from "accessible-nprogress";
// import "accessible-nprogress/dist/accessible-nprogress.css";

// interface ILazyLoadProps {
//   showSpinner?: boolean;
// }

// const LazyLoad: React.FC<ILazyLoadProps> = ({ showSpinner }) => {
//   useEffect(() => {
//     NProgress.configure({ showSpinner });
//     NProgress.start();

//     return () => {
//       NProgress.done();
//     };
//   });

//   return null;
// };

// type LazyLoadDefaultProps = Pick<ILazyLoadProps, "showSpinner">;

// LazyLoad.defaultProps = {
//   showSpinner: true,
// } as LazyLoadDefaultProps;

// export default LazyLoad;

const LazyLoad = () => {
  return (
    <div className="main-loader-overlay">
      <div className="loader">
        <div className="justify-content-center jimu-primary-loading"></div>
      </div>
    </div>
  )
}

export default LazyLoad
