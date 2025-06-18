'use client';
const { store } = require("@/redux/store");
const { Provider } = require("react-redux");

const MainLayout = ({ children }) => {
  return (
    <div >
        <Provider store={store}>
            {children}
        </Provider>
    </div>
  );
}

export default MainLayout;