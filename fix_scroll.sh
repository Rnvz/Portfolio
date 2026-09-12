#!/bin/bash
sed -i 's/w-full flex flex-col order-1 xl:order-2 justify-center h-auto xl:h-\[820px\]/w-full flex flex-col order-1 xl:order-2 justify-center/g' components/sections/Work.tsx
sed -i 's/className="flex flex-col w-full h-full overflow-y-auto no-scrollbar pb-8 xl:pb-0"/className="flex flex-col w-full h-full pb-8 xl:pb-0"/g' components/sections/Work.tsx
