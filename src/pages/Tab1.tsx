import { IonText, IonAccordion, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonAccordionGroup, IonToast } from '@ionic/react';
import { useContext, useState } from 'react';
import { shoppingStore } from './example';
import { Storage } from '@ionic/storage';
import './Tab1.css';
import { ListContext } from '../components/ListContext';

const Tab1: React.FC = () => {

  const storeList = shoppingStore.sort()

  const store = new Storage();
  store.create();

  const { setList } = useContext(ListContext)
  const [item, setItem] = useState('');
  const [showToast, setShowToast] = useState(false);

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const addItemToListTest = (e: any) => {
    setList({ type: "ADD_ITEM", payload: e.currentTarget.id })
    setItem(e.currentTarget.id)
    setShowToast(true)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <IonText color='primary'>
              Shopping Store
            </IonText>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonToast
      color='primary'
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={item + " added to the shopping list."}
        duration={1000}
      />
        <IonAccordionGroup>
          {storeList.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).map(e => (
            <div key={e.name}>
              <IonAccordion value={capitalize(e.name)}>
                <IonItem slot="header">
                  <IonLabel>
                    <IonText >
                      <h2>{(e.name).toUpperCase()}</h2>
                    </IonText>
                  </IonLabel>
                </IonItem>
                <IonList slot="content">
                  {Object.keys(e.items.sort()).map(key => (
                      <IonItem id={e.items[key]} key={e.items[key]} onClick={(e) => addItemToListTest(e)} class={"shop-item"}>
                        <IonLabel>
                          <IonText color="medium">
                            <h3>{capitalize(e.items[key])}</h3>
                          </IonText>
                        </IonLabel>
                      </IonItem>
                  ))}
                </IonList>
              </IonAccordion>
            </div>
          ))}
        </IonAccordionGroup>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
