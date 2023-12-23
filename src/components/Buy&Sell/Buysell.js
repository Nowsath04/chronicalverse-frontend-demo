import "./BuySell.css";
import blockchain from "../../Assets/blockchain (2).png";
import wallet from "../../Assets/wallet.png";
import cart from "../../Assets/cart.png";

const cardDetails = [
  {
    title: "Connect wallet",
    img: wallet,
    description:
      "Lorem ipsum dolor sit amet consectetur. Nam consequat egestas tortor laoreet. Non scelerisque proin id hendrerit libero dolor id. Amet pellentesque congue volutpat sociis.",
  },
  {
    title: "Add your NFTs",
    img: cart,
    description:
      "Lorem ipsum dolor sit amet consectetur. Nam consequat egestas tortor laoreet. Non scelerisque proin id hendrerit libero dolor id. Amet pellentesque congue volutpat sociis.",
  },
  {
    title: "List them for sale",
    img: blockchain,
    description:
      "Lorem ipsum dolor sit amet consectetur. Nam consequat egestas tortor laoreet. Non scelerisque proin id hendrerit libero dolor id. Amet pellentesque congue volutpat sociis.",
  },
];

export default function Buysell() {
  return (
    <>
      <h1 className="buysell_header">
        buy and sell your <span>NFT</span>
      </h1>
      <div className="buysell_mainCard">
        <div className="buysell_mainCard_div">
          <div className="buysell_mainCard_div_dd">
            <div className="Buyandsell_gradient"></div>
            <div className="buysell_card_Maincard">
              {/* {cardDetails.map((card, index) => {
                const { title, img, description } = card;
                return (
                  <div className="buysell_div">
                    <div className="buysell_card">
                      <div className="buysell">
                        <div className="buysell_img">
                          <img src={img} />
                          <div className="buysell_content">
                            <h2>{title}</h2>
                            <p>{description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })} */}
              <div className="buysell_div">
                <div className="buysell_card">
                  <div className="buysell">
                    <div className="buysell_img">
                      <img src={wallet} />
                      <div className="buysell_content">
                        <h2>Connect wallet</h2>
                        <p>
                          Lorem ipsum dolor sit amet consectetur. Nam consequat
                          egestas tortor laoreet. Non scelerisque proin id
                          hendrerit libero dolor id. Amet pellentesque congue
                          volutpat sociis.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div className="buysell_div">
                <div className="buysell_card">
                  <div className="buysell">
                    <div className="buysell_img">
                      <img src={cart} />
                      <div className="buysell_content">
                        <h2>Add your NFTs</h2>
                        <p>
                          Lorem ipsum dolor sit amet consectetur. Nam consequat
                          egestas tortor laoreet. Non scelerisque proin id
                          hendrerit libero dolor id. Amet pellentesque congue
                          volutpat sociis.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div className="buysell_div_3">
                <div className="buysell_card">
                  <div className="buysell">
                    <div className="buysell_img">
                      <img src={blockchain} />
                      <div className="buysell_content">
                        <h2>List them for sale</h2>
                        <p>
                          Lorem ipsum dolor sit amet consectetur. Nam consequat
                          egestas tortor laoreet. Non scelerisque proin id
                          hendrerit libero dolor id. Amet pellentesque congue
                          volutpat sociis.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="buy_sell_3_main_div">
            <div className="buysell_div_3_responsive">
              <div className="buysell_card">
                <div className="buysell">
                  <div className="buysell_img">
                    <img src={blockchain} />
                    <div className="buysell_content">
                      <h2>List them for sale</h2>
                      <p>
                        Lorem ipsum dolor sit amet consectetur. Nam consequat
                        egestas tortor laoreet. Non scelerisque proin id
                        hendrerit libero dolor id. Amet pellentesque congue
                        volutpat sociis.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="buysell_responsive">
        <div className="buysell_responsive_div_maindiv">
          <div className="buysell_responsive_div">
            {cardDetails.map((card, index) => {
              const { title, img, description } = card;
              return (
                <div className="buysell_responsive_card">
                  <div className="buysell_img_responsive">
                    <img src={img} />
                    <div className="buysell_content_responsive">
                      <h2>{title}</h2>
                      <p>{description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
