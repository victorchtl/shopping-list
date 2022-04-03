import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonInput, IonText } from '@ionic/react';
import { useContext, useEffect, useState } from 'react';
import { Storage } from '@ionic/storage';
import './Tab2.css';
import { ListContext } from '../components/ListContext';



const Tab2: React.FC = () => {

  const store = new Storage();
  store.create();

  const { list, setList } = useContext(ListContext)
  const [item, setItem] = useState('');

  const addItem = () => {
    setList({ type: "ADD_ITEM", payload: item })
    setItem('')
  }

  const removeItem = (e: any) => {
    setList({ type: "REMOVE_ITEM", payload: e.currentTarget.id })
  }

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const retrieveList = async () => {
    const localStore = await store.get('shoppingList');
    if (localStore !== null) {
      setList({ type: "RETRIEVE_ITEMS", payload: localStore })
    }
  }

  useEffect(() => {
    retrieveList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
          <IonText color='primary'>
              Shopping List
            </IonText>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList >
          <IonItem>
            <IonInput value={item} placeholder="Add an item" onIonChange={e => setItem(e.detail.value!)}></IonInput>
            <IonButton onClick={addItem}>ADD ITEM</IonButton>
          </IonItem>
          {Object.keys(list.items).map(key => (
            <IonItem id={list.items[key]} key={list.items[key]} onClick={(e) => removeItem(e)} class={'list-item'}>
              <IonLabel>
                <h2>{capitalize(list.items[key])}</h2>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
