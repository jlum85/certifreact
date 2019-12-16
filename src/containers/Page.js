import React from "react";
import Progress from "../components/Progress";

const Page = props => {
  //   console.log("Page");
  //   console.log(props);
  return (
    <section>
      <Progress
        currentPage={props.currentPage}
        onPrev={props.onPrev}
        onNext={props.onNext}
      />
    </section>
  );
};

export default Page;
