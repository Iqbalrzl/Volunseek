import { Header } from "@/components/Header";
import aboutImg from "@/assets/images/aboutImg.png";

export const AboutUs = () => {
  return (
    <>
      <Header />
      <div className="min-h-[50vh] bg-[#D1F2EB] w-full m-0 relative">
        <div className="absolute top-32 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h2 className="text-3xl font-bold ">Kenali VolunSeek Lebih Dekat</h2>
        </div>
        <img
          src={aboutImg}
          alt=""
          className="absolute top-80 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-50"
        />
      </div>
      <main className="min-h-[80vh] md:w-auto mx-auto px-8 lg:px-16 mt-14 relative">
        <div className="flex justify-center relative">
          <div className="w-4/5 flex flex-col justify-center">
            <p className="mt-36">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste,
              perferendis! Magnam quasi rem quae cupiditate quis illo,
              reprehenderit blanditiis obcaecati repellat, nihil fuga adipisci
              perferendis voluptate fugiat eius suscipit nesciunt officiis
              possimus? Expedita quos necessitatibus eveniet optio officia,
              dignissimos nemo veritatis obcaecati quia voluptas culpa vitae
              sunt repudiandae. Quia nemo aspernatur exercitationem, adipisci ea
              quod saepe ipsam commodi fuga, omnis ut quaerat debitis! Sequi
              porro nobis voluptatibus saepe rem! Sapiente modi ipsa nihil enim
              perferendis quia nam impedit incidunt voluptates ratione sequi
              officiis commodi beatae totam facere quos praesentium reiciendis
              illo, iure alias repellendus! Aliquid aspernatur tempore nihil
              ullam autem.
            </p>
          </div>
        </div>
      </main>
    </>
  );
};
