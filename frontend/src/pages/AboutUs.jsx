import aboutImg from "@/assets/images/aboutImg.png";

export const AboutUs = () => {
  return (
    <div className="min-h-fit">
      <div className=" relative bg-[#D1F2EB] rounded-b-full ">
        <div className="mx-auto mt-12 px-4 py-20 sm:px-6 lg:px-5">
          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl text-slate-800">
              Kenali VolunSeek Lebih Dekat
            </h2>
          </div>
          {/* <div className="mt-10">
            <img src={aboutImg} alt="" className="mx-auto max-w-full h-auto" />
          </div> */}
        </div>
      </div>
      <main className="min-h-[70vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center flex-col md:flex-row md:items-center md:gap-8">
          <div className="md:w-1/2">
            {" "}
            {/* Sesuaikan lebar di layar sedang */}
            <img
              src={aboutImg}
              alt=""
              className="mx-auto max-w-full h-auto mb-6 md:mb-0"
            />
          </div>
          <div className="md:w-1/2">
            {" "}
            {/* Sesuaikan lebar di layar sedang */}
            <p className="text-lg text-gray-700">
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
              ullam autem. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Recusandae laboriosam, sint consequatur vero repellat ipsam
              nulla eius aut accusantium beatae deleniti dolor blanditiis ex
              quibusdam molestias voluptas vel itaque consectetur.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
