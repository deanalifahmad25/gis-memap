import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import Map from "react-map-gl/maplibre";

export default function Welcome({ auth }) {
    useEffect(() => {
        $(".mobile-menu-button").each(function(_, navToggler) {
            var target = $(navToggler).data("target");
            $(navToggler).on("click", function() {
                $(target).animate({
                    height: "toggle",
                })
            });
        });
    }, []);

    return (
        <>
            <Head title="Welcome" />
            <section className="font-be-vietnam bg-dark-1 h-auto">
                <nav className="px-4 mx-auto max-w-screen-2xl lg:px-24 lg:pt-7 pt-5">
                    <div className="flex flex-col w-full lg:flex-row lg:items-center gap-5 divide-gray-700 lg:divide-x">
                        <div className="flex items-center justify-between flex-none">
                            <div className="text-xl text-white font-bold"> MeMap. </div>
                            <div>
                                <button className="block p-1 outline-none lg:hidden mobile-menu-button" data-target="#navigation">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="text-white w-7 h-7" x-show="!showMenu"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M4 8h16M4 16h16"> </path>
                                        <path stroke-linecap="round" className="hidden w-7 h-7" stroke-linejoin="round"
                                            stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex hidden w-full mx-auto mobile-menu lg:block" id="navigation">
                            <div className="flex flex-col items-baseline justify-between mx-auto mt-6 lg:flex-row lg:items-center lg:mt-0">
                                <div className="flex flex-col w-full text-base font-normal text-white lg:flex-row lg:w-max lg:pl-4">
                                    <a href="#" className="py-3 pl-2 mx-2 lg:mr-9 lg:pl-0 hover:opacity-70">Home</a>
                                    <a href="#maps" className="py-3 pl-2 mx-2 lg:mr-9 lg:pl-0 hover:opacity-70">Maps</a>
                                    <a href="#" className="py-3 pl-2 mx-2 lg:mr-9 lg:pl-0 hover:opacity-70">Contact</a>
                                </div>
                                <div className="flex flex-col lg:flex-row inline-flex gap-4 lg:gap-7 w-full px-3 mt-4 lg:mt-0 lg:w-max lg:px-0">
                                {auth.user ? (
                                    <a href="#" className="w-full lg:w-auto px-5 py-3 bg-champ-green text-center rounded-lg flex bg-white lg:mx-auto bg-transparent transition ease-out duration-200 hover:bg-champ-green hover:opacity-30">
                                        <span className="text-base w-full font-semibold text-dark-1">Dashboard</span>
                                    </a>
                                ) : (
                                    <a href="#" className="w-full lg:w-auto px-5 py-3 bg-champ-green text-center rounded-lg flex bg-white lg:mx-auto bg-transparent transition ease-out duration-200 hover:bg-champ-green hover:opacity-30">
                                        <span className="text-base w-full font-semibold text-dark-1">Sign In</span>
                                    </a>
                                )}
                                </div>
                            </div>
                        </div>

                        
                    </div>
                </nav>
                <main className="py-20 px-4 mt-20 mx-auto max-w-screen-2xl lg:px-24">
                    <div className="flex flex-col text-center">
                        <div className="headline font-bold text-5xl text-white leading-normal lg:leading-snug"> Just a Simple Maps
                            <br className="hidden lg:block" /> to Find Location </div>
                        <div className="mt-5 mb-12">
                            <p className="font-medium text-sm lg:text-base text-white leading-7"> The simplest GIS that provide information to      help you find location. </p>
                        </div>
                        <div className="mt-20 container mx-auto flex items-center justify-center flex-col" id="maps">
                            <Map
                                initialViewState={{
                                    longitude: 107.608238,
                                    latitude: -6.914864,
                                    zoom: 12,
                                }}
                                style={{ width: "100%", height: 600 }}
                                mapStyle="https://api.maptiler.com/maps/5fa45fd6-3b7a-488e-9349-4dbbb6b4568d/style.json?key=Kk5Jt6PL6fwFbwwgIDfy"
                            />
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
}
