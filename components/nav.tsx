import React, { Fragment } from "react";
import Link from "next/link";
import Search from "./search";
import Blockies from 'react-blockies';
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from "../lib/thirdweb-client";
import { truncateAddress } from "../utils/truncateAddress";

interface NavProps {
  imageSrc?: string;
  text1?: React.ReactNode;
  text?: React.ReactNode;
  rootClassName?: string;
  text2?: React.ReactNode;
  imageAlt?: string;
  heading?: React.ReactNode;
  openModal: () => void;
  openModal4: () => void;
  closeModal: () => void;
  openModal1: () => void;
  closeModal1: () => void;
}

const Nav: React.FC<NavProps> = ({
  imageSrc = "/rare-200w.png",
  text1,
  text,
  rootClassName = "",
  text2,
  imageAlt = "image",
  heading,
  openModal,
  openModal4,
  closeModal,
  openModal1,
  closeModal1,
}) => {
  const account = useActiveAccount();
  const address = account?.address
  return (
    <>
      <div className={`nav-container1 ${rootClassName}`}>
        <div className="nav-container2">
          {/* Resources Button */}
          <div className="nav-container3" onClick={openModal}>
            <span>
              {text1 ?? (
                <Fragment>
                  <span className="nav-text14">Resources</span>
                </Fragment>
              )}
            </span>
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                d="m12 13.171l4.95-4.95l1.414 1.415L12 16L5.636 9.636L7.05 8.222z"
                fill="currentColor"
              ></path>
            </svg>
          </div>

          {/* Logo and Heading */}
          <div className="nav-container4">
            <img alt={imageAlt} src={imageSrc} className="nav-image" />
            <Link href="/">
              <h1 className="nav-text11">
                {heading ?? (
                  <Fragment>
                    <h1 className="nav-text17">
                      <span className="nav-text18">Rare</span>
                      <span className="nav-text19">Bay</span>
                    </h1>
                  </Fragment>
                )}
              </h1>
            </Link>

            <div className="nav-container5">
              <span className="nav-text12">
                {text2 ?? (
                  <Fragment>
                    <span className="nav-text16">Beta</span>
                  </Fragment>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Search Component */}
        <div className="nav-container6">
          <Search rootClassName="searchroot-class-name1" />
        </div>

        {/* Connect Button */}
      
      {address ? <div>
        <div className="nav-container7" onClick={openModal4}><img src="/RAR31ONES (3).jpg" style={{borderRadius: '100px', height: '36px', width: '36px', border: 'solid 3px purple', objectFit: 'cover', textShadow: '5px 5px 10px'}} /><h6>{truncateAddress(address)}</h6></div>
      </div> : 
        <div className="nav-container7 button" onClick={openModal1}>Connect</div>}
      </div>
    </>
  );
};

export default Nav;
