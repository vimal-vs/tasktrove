export enum CollectionColors {
    sunset = "bg-gradient-to-r from-red-500 to-orange-500",
    poppy = "bg-gradient-to-r from-rose-400 to-red-500",
    rosebud = "bg-gradient-to-r from-violet-500 to-purple-500",
    snowflake = "bg-gradient-to-r from-teal-400 to-blue-400",
    candy = "bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500",
    firtree = "bg-gradient-to-r from-emerald-500 to-emerald-900",
    metal = "bg-gradient-to-r from-slate-500 to-slate-800",
    powder = "bg-gradient-to-r from-pink-300 to-purple-400",
}

export type CollectionColor = keyof typeof CollectionColors;