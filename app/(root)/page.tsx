import HeaderBox from "@/components/HeaderBox";
import RightSideBar from "@/components/RightSideBar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import React from "react";

const Home = () => {
    const loggedIn = {
        firstName: "Eguin",
        lastName: "Jonathan",
        email: "eguinjonathan08@gmail.com"
    };

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox type="greeting" title="Welcome" user={loggedIn?.firstName || "Guest"}  subtext="Access and manage your account and transactions easily"/>

            <TotalBalanceBox 
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.34}/>

        </header>

        RECENT TRANSACTION
      </div>

      <RightSideBar user={loggedIn} transaction={[]} banks={[{}, {}]} />
    </section>
  );
};

export default Home;
