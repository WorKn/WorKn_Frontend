import React, { useState } from "react";
import ScrollableModal from "../components/modal-components/ScrollableModal";

export const useScrollableModal = () => {
    const [isVisible, setIsVisible] = useState(false);
    const show = () => setIsVisible(true);
    const hide = () => setIsVisible(false);

    const RenderModal = ({ children }: { children: React.ReactChild }) => (
        <React.Fragment>
            {isVisible && <ScrollableModal closeModal={hide}>{children}</ScrollableModal>}
        </React.Fragment>
    );

    return {
        show,
        hide,
        RenderModal,
    };
};
