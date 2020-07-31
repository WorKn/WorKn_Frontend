import React from "react";
import "./LandingPage-Style.css";
import { useModal } from "../../components/useModal.tsx";

const LandingPage = React.memo(() => {
  const { show: showA, RenderModal: RenderModalA } = useModal();
  const { show: showB, RenderModal: RenderModalB } = useModal();

  return (
    <div>
      <div>
        <h1>This is my landing page</h1>
        <button onClick={showA}>Register popup</button>
        <button onClick={showB}>Login popup</button>

        <RenderModalA>
          <p>This is the register modal</p>
        </RenderModalA>

        <RenderModalB>
          <p>This is the login modal</p>
        </RenderModalB>
      </div>
      <div id="modal-root" />
    </div>
  );
});

export default LandingPage;
