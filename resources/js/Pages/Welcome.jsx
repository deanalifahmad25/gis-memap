import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";
import Map, {
    FullscreenControl,
    GeolocateControl,
    Marker,
    NavigationControl,
    Popup,
    ScaleControl,
} from "react-map-gl/maplibre";
import ItemSlider from "@/Components/ItemSlider";

const Location = ({ auth }) => {
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

    const { locations } = usePage().props;

    const sliderRef = useRef();
    const mapRef = useRef();

    const [popupInfo, setPopupInfo] = useState(null);

    // handle scroll image based on clicked pin
    const scrollToSlide = useCallback(
        (index) => {
        sliderRef.current.slickGoTo(index);
        },
        [sliderRef]
    );

    // handle jum to long,lat when click on the slider
    const handleJumpTo = useCallback(
        (long, lat) => {
        mapRef.current.easeTo(
            {
            center: [long, lat],
            zoom: 13, // Zoom level of the target location
            bearing: 0, // Bearing of the map (optional)
            pitch: 0, // Pitch of the map (optional)
            },
            {
            duration: 2000, // Animation duration in milliseconds
            easing: (t) => t, // Easing function, default is linear
            }
        );
        },
        [mapRef]
    );

    // map all locations to pin, dont forget to use useMemo to improve perfomance
    const pins = useMemo(
        () =>
        locations.map((location, index) => (
            <Marker
            key={`marker-${index}`}
            longitude={location.long}
            latitude={location.lat}
            anchor="bottom"
            onClick={(e) => {
                e.originalEvent.stopPropagation();
                setPopupInfo(location);
                scrollToSlide(index);
                handleJumpTo(location.long, location.lat);
            }}
            >
            <img
                src="https://img.icons8.com/color/96/000000/visit.png"
                className="h-9 w-9"
            />
            </Marker>
        )),
        []
    );

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
                                    <a href={ route('welcome') } className="py-3 pl-2 mx-2 lg:mr-9 lg:pl-0 hover:opacity-70">Home</a>
                                    <a href="#maps" className="py-3 pl-2 mx-2 lg:mr-9 lg:pl-0 hover:opacity-70">Maps</a>
                                    <a href="#" className="py-3 pl-2 mx-2 lg:mr-9 lg:pl-0 hover:opacity-70">Contact</a>
                                </div>
                                <div className="flex flex-col lg:flex-row inline-flex gap-4 lg:gap-7 w-full px-3 mt-4 lg:mt-0 lg:w-max lg:px-0">
                                {auth.user ? (
                                    <a href={ route('dashboard') } className="w-full lg:w-auto px-5 py-3 bg-champ-green text-center rounded-lg flex bg-white lg:mx-auto bg-transparent transition ease-out duration-200 hover:bg-champ-green hover:opacity-30">
                                        <span className="text-base w-full font-semibold text-dark-1">Dashboard</span>
                                    </a>
                                ) : (
                                    <a href={ route('login') } className="w-full lg:w-auto px-5 py-3 bg-champ-green text-center rounded-lg flex bg-white lg:mx-auto bg-transparent transition ease-out duration-200 hover:bg-champ-green hover:opacity-30">
                                        <span className="text-base w-full font-semibold text-dark-1">Sign In</span>
                                    </a>
                                )}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <main className="py-20 px-4 my-20 mx-auto max-w-screen-2xl lg:px-24">
                    <div className="flex flex-col">
                        <div className="headline font-bold text-5xl text-white text-center leading-normal lg:leading-snug"> Just a Simple Maps
                            <br className="hidden lg:block" /> to Find Location </div>
                        <div className="mt-5 mb-12">
                            <p className="font-medium text-sm lg:text-base text-white text-center leading-7"> The simplest GIS that provide information to help you find location. </p>
                        </div>
                        <div className="mt-20 container mx-auto flex items-center justify-center flex-col" id="maps">
                            <Map
                                reuseMaps
                                ref={mapRef}
                                initialViewState={{
                                    longitude: 107.608238,
                                    latitude: -6.914864,
                                    zoom: 12,
                                    bearing: 0,
                                    pitch: 0,
                                }}
                                style={{ width: "100%", height: 600 }}
                                mapStyle="https://api.maptiler.com/maps/5fa45fd6-3b7a-488e-9349-4dbbb6b4568d/style.json?key=Kk5Jt6PL6fwFbwwgIDfy"
                            >
                            <GeolocateControl position="top-left" />
                            <FullscreenControl position="top-left" />
                            <NavigationControl position="top-left" />
                            <ScaleControl />
                            {pins}
                            {/* Handle Pop Up when Pin Clicked */}
                            {popupInfo && (
                                <Popup
                                    anchor="top"
                                    longitude={Number(popupInfo.long)}
                                    latitude={Number(popupInfo.lat)}
                                    onClose={() => setPopupInfo(null)}
                                >
                                <div className="mb-3">
                                    <h2 className="font-semibold mb-2 text-lg">
                                        {popupInfo.name}
                                    </h2>
                                    <p>{popupInfo.description}</p>
                                </div>
                                <img
                                    width="100%"
                                    src={popupInfo.image_url}
                                    className="object-cover rounded-sm"
                                />
                                </Popup>
                            )}
                            </Map>
                            {/* Show Slider and navigate to pin when clicked */}
                            <div className="mt-8 w-3/4">
                                <ItemSlider
                                locations={locations}
                                ref={sliderRef}
                                handleJumpTo={handleJumpTo}
                                setPopupInfo={setPopupInfo}
                                />
                            </div>
                        </div>
                    </div>
                </main>
                <hr class="h-0.5 border-t-0 bg-dark-2 opacity-100" />
                <div className="relative isolate flex items-center gap-x-6 overflow-hidden px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <p className="text-sm leading-6 text-white">
                            <strong className="font-semibold">© 2023 MeMap. All rights reserved.</strong>
                        </p>
                    </div>
                    <div className="flex flex-1 justify-end">
                    </div>
                </div>
            </section>
        </>
    );
};

export default Location;