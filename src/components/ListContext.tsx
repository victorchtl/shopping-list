import { createContext, useReducer } from "react";
import { Storage } from '@ionic/storage';

let initialState: any = { items: [] }

const store = new Storage();
store.create();

function decapitalize(str: string) {
    return str.charAt(0).toLowerCase() + str.slice(1);
}

const addToIonicStore = async (data: any) => {
    const localStore = await store.get('shoppingList');
    console.log(localStore)
    if (localStore !== null) {
        const dataStoreArrayAddItem = localStore.items
        dataStoreArrayAddItem.push(decapitalize(data))
        await store.set('shoppingList', { items: dataStoreArrayAddItem });
    } else {
        await store.set('shoppingList', { items: [data] });
    }
}

const removeFromIonicStore = async (data: any) => {
    const localStore = await store.get('shoppingList');
    const filteredItems = localStore.items.filter((item: string) => item !== data)
    await store.set('shoppingList', { items: filteredItems });

}

let reducer = (state: any, action: any) => {
    switch (action.type) {

        case "RESET_LIST":
            return initialState;

        case "ADD_ITEM":
            let item = state.items.find((el: string) => el === action.payload);
            if (item === undefined || item === null) {
                addToIonicStore(action.payload)
                return {
                    ...state,
                    items: [...state.items, action.payload].sort()
                }
            } return { ...state }

        case "REMOVE_ITEM":
            removeFromIonicStore(action.payload)
            const filteredItems = state.items.filter((item: string) => item !== action.payload)
            return {
                ...state,
                items: filteredItems.sort()
            }

        case "RETRIEVE_ITEMS":
            return {
                items: action.payload.items
            }
    }
};

export const ListContext = createContext(initialState);

export const ListProvider = (props: any) => {

    const [list, setList] = useReducer(reducer, initialState);

    return (
        <ListContext.Provider value={{ list, setList }}>
            {props.children}
        </ListContext.Provider>
    )

}

export const ListContextConsumer = ListContext.Consumer;