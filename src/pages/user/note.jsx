import React from "react";
import Header from "../../components/header";
import { AiFillPushpin } from "react-icons/ai";

const fakeData = [
  {
    id: 1,
    title: "Note 1",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    color: "bg-yellow-200",
  },
  {
    id: 2,
    title: "Note 2",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It was popularised in the 1960s with the release of Letraset sheets.",
    color: "bg-pink-200",
  },
  {
    id: 3,
    title: "Note 3",
    content:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.",
    color: "bg-red-200",
  },
  {
    id: 4,
    title: "Note 4",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It was popularised in the 1960s with the release of Letraset sheets.",
    color: "bg-blue-200",
  },
  {
    id: 5,
    title: "Note 5",
    content:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.",
    color: "bg-purple-200",
  },
];

const Note = () => (
  <div className="grid grid-cols-6">
    <div className="col-span-1">
        <div className="border bg-purple-300 p-2 rounded-lg">
            Group
        </div>
        <div>
            Note
        </div>
        <div>
            Shared with me
        </div>
    </div>
    <div className="">
      <Header />
      <div className="flex space-x-3">
        <div className="space-y-3">
          <div className="relative border-2 border-gray-800 w-[300px] bg-yellow-200 p-4">
            <AiFillPushpin size={30} className="absolute -right-2 -top-2" />
            <div className="flex space-x-1 items-center">
              <img
                className="rounded-full w-[30px]"
                src="https://picsum.photos/200"
                alt="avatar"
              />
              <div className="font-bold">Title: just a note</div>
            </div>
            <div className="text-gray-500 text-sm">
                7/11/2024
            </div>
            <div className="underline line-clamp-6 font-notefont text-xl">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          </div>
          <div className="relative border-2 border-gray-800 w-[300px] bg-yellow-200 p-4">
            <AiFillPushpin size={30} className="absolute -right-2 -top-2" />
            <div className="flex space-x-1 items-center">
              <img
                className="rounded-full w-[30px]"
                src="https://picsum.photos/200"
                alt="avatar"
              />
              <div className="font-bold">Title: just a note</div>
            </div>
            <div className="text-gray-500 text-sm">
                7/11/2024
            </div>
            <div className="underline line-clamp-6 font-notefont text-xl">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          </div>
          <div className="relative border-2 border-gray-800 w-[300px] bg-yellow-200 p-4">
            <AiFillPushpin size={30} className="absolute -right-2 -top-2" />
            <div className="flex space-x-1 items-center">
              <img
                className="rounded-full w-[30px]"
                src="https://picsum.photos/200"
                alt="avatar"
              />
              <div className="font-bold">Title: just a note</div>
            </div>
            <div className="text-gray-500 text-sm">
                7/11/2024
            </div>
            <div className="underline line-clamp-6 font-notefont text-xl">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          </div>
          <div className="relative border-2 border-gray-800 w-[300px] bg-yellow-200 p-4">
            <AiFillPushpin size={30} className="absolute -right-2 -top-2" />
            <div className="flex space-x-1 items-center">
              <img
                className="rounded-full w-[30px]"
                src="https://picsum.photos/200"
                alt="avatar"
              />
              <div className="font-bold">Title: just a note</div>
            </div>
            <div className="text-gray-500 text-sm">
                7/11/2024
            </div>
            <div className="underline line-clamp-6 font-notefont text-xl">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="relative border-2 border-gray-800 w-[300px] bg-yellow-200 p-4">
            <AiFillPushpin size={30} className="absolute -right-2 -top-2" />
            <div className="flex space-x-1 items-center">
              <img
                className="rounded-full w-[30px]"
                src="https://picsum.photos/200"
                alt="avatar"
              />
              <div className="font-bold">Title: just a note</div>
            </div>
            <div className="text-gray-500 text-sm">
                7/11/2024
            </div>
            <div className="underline line-clamp-6 font-notefont text-xl">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          </div>
          <div className="relative border-2 border-gray-800 w-[300px] bg-yellow-200 p-4">
            <AiFillPushpin size={30} className="absolute -right-2 -top-2" />
            <div className="flex space-x-1 items-center">
              <img
                className="rounded-full w-[30px]"
                src="https://picsum.photos/200"
                alt="avatar"
              />
              <div className="font-bold">Title: just a note</div>
            </div>
            <div className="text-gray-500 text-sm">
                7/11/2024
            </div>
            <div className="underline line-clamp-6 font-notefont text-xl">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          </div>
          <div className="relative border-2 border-gray-800 w-[300px] bg-yellow-200 p-4">
            <AiFillPushpin size={30} className="absolute -right-2 -top-2" />
            <div className="flex space-x-1 items-center">
              <img
                className="rounded-full w-[30px]"
                src="https://picsum.photos/200"
                alt="avatar"
              />
              <div className="font-bold">Title: just a note</div>
            </div>
            <div className="text-gray-500 text-sm">
                7/11/2024
            </div>
            <div className="underline line-clamp-6 font-notefont text-xl">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          </div>
          <div className="relative border-2 border-gray-800 w-[300px] bg-yellow-200 p-4">
            <AiFillPushpin size={30} className="absolute -right-2 -top-2" />
            <div className="flex space-x-1 items-center">
              <img
                className="rounded-full w-[30px]"
                src="https://picsum.photos/200"
                alt="avatar"
              />
              <div className="font-bold">Title: just a note</div>
            </div>
            <div className="text-gray-500 text-sm">
                7/11/2024
            </div>
            <div className="underline line-clamp-6 font-notefont text-xl">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="relative border-2 border-gray-800 w-[300px] bg-yellow-200 p-4">
            <AiFillPushpin size={30} className="absolute -right-2 -top-2" />
            <div className="flex space-x-1 items-center">
              <img
                className="rounded-full w-[30px]"
                src="https://picsum.photos/200"
                alt="avatar"
              />
              <div className="font-bold">Title: just a note</div>
            </div>
            <div className="text-gray-500 text-sm">
                7/11/2024
            </div>
            <div className="underline line-clamp-6 font-notefont text-xl">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          </div>
          <div className="relative border-2 border-gray-800 w-[300px] bg-yellow-200 p-4">
            <AiFillPushpin size={30} className="absolute -right-2 -top-2" />
            <div className="flex space-x-1 items-center">
              <img
                className="rounded-full w-[30px]"
                src="https://picsum.photos/200"
                alt="avatar"
              />
              <div className="font-bold">Title: just a note</div>
            </div>
            <div className="text-gray-500 text-sm">
                7/11/2024
            </div>
            <div className="underline line-clamp-6 font-notefont text-xl">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          </div>
          <div className="relative border-2 border-gray-800 w-[300px] bg-yellow-200 p-4">
            <AiFillPushpin size={30} className="absolute -right-2 -top-2" />
            <div className="flex space-x-1 items-center">
              <img
                className="rounded-full w-[30px]"
                src="https://picsum.photos/200"
                alt="avatar"
              />
              <div className="font-bold">Title: just a note</div>
            </div>
            <div className="text-gray-500 text-sm">
                7/11/2024
            </div>
            <div className="underline line-clamp-6 font-notefont text-xl">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          </div>
          <div className="relative border-2 border-gray-800 w-[300px] bg-yellow-200 p-4">
            <AiFillPushpin size={30} className="absolute -right-2 -top-2" />
            <div className="flex space-x-1 items-center">
              <img
                className="rounded-full w-[30px]"
                src="https://picsum.photos/200"
                alt="avatar"
              />
              <div className="font-bold">Title: just a note</div>
            </div>
            <div className="text-gray-500 text-sm">
                7/11/2024
            </div>
            <div className="underline line-clamp-6 font-notefont text-xl">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="relative border-2 border-gray-800 w-[300px] bg-yellow-200 p-4">
            <AiFillPushpin size={30} className="absolute -right-2 -top-2" />
            <div className="flex space-x-1 items-center">
              <img
                className="rounded-full w-[30px]"
                src="https://picsum.photos/200"
                alt="avatar"
              />
              <div className="font-bold">Title: just a note</div>
            </div>
            <div className="text-gray-500 text-sm">
                7/11/2024
            </div>
            <div className="underline line-clamp-6 font-notefont text-xl">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          </div>
          <div className="relative border-2 border-gray-800 w-[300px] bg-yellow-200 p-4">
            <AiFillPushpin size={30} className="absolute -right-2 -top-2" />
            <div className="flex space-x-1 items-center">
              <img
                className="rounded-full w-[30px]"
                src="https://picsum.photos/200"
                alt="avatar"
              />
              <div className="font-bold">Title: just a note</div>
            </div>
            <div className="text-gray-500 text-sm">
                7/11/2024
            </div>
            <div className="underline line-clamp-6 font-notefont text-xl">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          </div>
          <div className="relative border-2 border-gray-800 w-[300px] bg-yellow-200 p-4">
            <AiFillPushpin size={30} className="absolute -right-2 -top-2" />
            <div className="flex space-x-1 items-center">
              <img
                className="rounded-full w-[30px]"
                src="https://picsum.photos/200"
                alt="avatar"
              />
              <div className="font-bold">Title: just a note</div>
            </div>
            <div className="text-gray-500 text-sm">
                7/11/2024
            </div>
            <div className="underline line-clamp-6 font-notefont text-xl">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          </div>
          <div className="relative border-2 border-gray-800 w-[300px] bg-yellow-200 p-4">
            <AiFillPushpin size={30} className="absolute -right-2 -top-2" />
            <div className="flex space-x-1 items-center">
              <img
                className="rounded-full w-[30px]"
                src="https://picsum.photos/200"
                alt="avatar"
              />
              <div className="font-bold">Title: just a note</div>
            </div>
            <div className="text-gray-500 text-sm">
                7/11/2024
            </div>
            <div className="underline line-clamp-6 font-notefont text-xl">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Note;
