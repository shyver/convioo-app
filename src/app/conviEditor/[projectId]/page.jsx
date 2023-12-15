import ConviEditor from '@/app/components/ConviEditor';
import { db } from '@/app/firebase';
import { getDoc,doc } from 'firebase/firestore';


// export async function generateStaticParams() {
//   const user = GetLocalUser();
//   const uploads = await getDoc(doc(db,`${user.uid}/videos/`));
//   return uploads.docs.map((doc) => ({ params: { projectId: doc.id } }))
// }


export default function Page({params: {projectId}}) {
      return (<ConviEditor projectId={projectId}/>)
  }
