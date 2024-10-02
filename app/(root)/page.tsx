import HeaderBox from "@/components/HeaderBox";
import RightSideBar from "@/components/RightSideBar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

const Home = async () => {
    const loggedIn = await getLoggedInUser();

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox type="greeting" title="Welcome" user={loggedIn?.name || "Guest"}  subtext="Access and manage your account and transactions easily"/>

            <TotalBalanceBox 
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.34}/>

        </header>

        RECENT TRANSACTION
      </div>

      <RightSideBar user={loggedIn} transaction={[]} banks={[{ currentBalance: 1250.34}, {currentBalance: 1290.34}]} />
    </section>
  );
};

export default Home;
