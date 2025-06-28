"use client";

import { Button } from "@/components/ui/button";
import { decrement, increment } from "@/store/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function Home() {
  const dispatch = useAppDispatch();
  const { value } = useAppSelector((state) => state.counter);
  return (
    <div className="flex flex-col gap-y-2 h-screen justify-center items-center">
      <p>{value}</p>
      <div className="flex gap-2 items-center">
        <Button onClick={() => dispatch(decrement())}>Decrement</Button>
        <Button onClick={() => dispatch(increment())}>Increment</Button>
      </div>
    </div>
  );
}
