import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GrabberIcon from '../helpers/Icons';
import courses from "../helpers/SampleData.json";

const ItemType = 'CARD';

const DraggableCard = ({ card, index, moveCard }) => {
    const [, ref] = useDrag({
        type: ItemType,
        item: { index },
    });

    const [, drop] = useDrop({
        accept: ItemType,
        hover(item) {
            if (item.index !== index) {
                moveCard(item.index, index);
                item.index = index;
            }
        },
    });

    return (
        <div ref={(node) => ref(drop(node))} className='bg-gray-100 shadow-md mt-2 w-[920px] h-[76px] rounded-md border border-gray-200'>
            <div className='flex flex-row'>
                <div className='mt-[20px] ml-2 '>
                    <GrabberIcon />
                </div>
                <img src={card.image} alt={card.name} className="inline-block h-16 w-26 mt-2 mr-4" />
                <div className='mt-6 font-semibold ml-1'>{card.name}</div>
                <div className='absolute ml-[670px]'>
                    <div className='mt-6 font-medium'>{card.price}</div>
                </div>
                <div className="absolute mt-6 ml-[770px] font-normal border border-gray-100 text-[12px] bg-green-200 text-black px-4 py-1 rounded-md">
                    {card.type}
                </div>
                <div className='absolute ml-[870px]'>
                    <img
                        src="threeDots.png"
                        alt=""
                        className='w-[25px] h-[25px] cursor-pointer mt-6'
                    />
                </div>
            </div>
            
            
        </div>
    );
};

const Cards = () => {
    const [cards, setCards] = useState(courses);

    const moveCard = (fromIndex, toIndex) => {
        const updatedCards = [...cards];
        const [movedCard] = updatedCards.splice(fromIndex, 1);
        updatedCards.splice(toIndex, 0, movedCard);
        setCards(updatedCards);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="bg-[#D2E3C8] p-4 h-screen w-screen">
                <div className='ml-[480px] h-[97px] w-[553px] text-[#4F6F52] text-[80px] font-inter font-semibold [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-[#4F6F52]'>
                    Chai aur Code
                </div>
                <div className='bg-[#F9F7F7] absolute mt-[35px] h-[580px] ml-[200px] w-[1100px] gap-0 rounded-[18px]'>
                    <div className='flex flex-col mt-10 ml-[40px]'>
                        <div className='font-inter font-bold text-[35px] leading-[48.41px]'>Manage Bundle</div>
                        <div className='text-[20px] text-gray-500 font-normal font-inter leading-[24.2px]'>Change orders of the products based on priority</div>
                        <div className='mt-5'>
                            {cards.map((card, index) => (
                                <DraggableCard key={index} index={index} card={card} moveCard={moveCard} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
        </DndProvider>
    );
};

export default Cards;
