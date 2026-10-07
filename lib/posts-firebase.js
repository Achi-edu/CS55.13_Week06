import { db } from './firebase'; // firebase db instance
import { collection, getDocs, query, where, documentId } from 'firebase/firestore'; // firestore helpers

export async function getSortedPostsData() { // get posts for the home list
    const myCollectionRef = collection(db, "posts"); // posts collection ref
    const querySnapshot = await getDocs(myCollectionRef); // fetch all docs
    const jsonObj = querySnapshot.docs.map(doc => Object.assign({ id: doc.id }, doc.data())); // docs to objects

    jsonObj.sort(function (a, b) { // sort by date
        return a.date.localeCompare(b.date); // earlier dates first
    }); // end sort

    return jsonObj.map(item => { // map to list fields
        return { // post summary object
            id: item.id.toString(), // id as string
            title: item.title, // title
            date: item.date, // date
            bands: item.bands // bands array
        } // end object
    }); // end map
} // end getSortedPostsData

export async function getAllPostIds() { // get ids for getStaticPaths
    const myCollectionRef = collection(db, "posts"); // posts collection ref
    const querySnapshot = await getDocs(myCollectionRef); // fetch all docs
    const jsonObj = querySnapshot.docs.map(doc => ({ id: doc.id })); // keep only ids

    return jsonObj.map(item => { // map each post to a path
        return { // path entry
            params: { // params for [id]
                id: item.id.toString() // id as string
            } // end params
        } // end path entry
    }); // end map
} // end getAllPostIds

export async function getPostData(id) { // get one post by id
    const myCollectionRef = collection(db, "posts"); // posts collection ref
    const searchQuery = query( // build id lookup query
        myCollectionRef, // search in posts
        where( // filter where
            documentId(), // doc id field
            "==", // equals
            id // requested id
        ) // end where
    ); // end query
    const querySnapshot = await getDocs(searchQuery); // run the query
    const jsonObj = querySnapshot.docs.map(doc => Object.assign({ id: doc.id }, doc.data())); // docs to objects

    if (jsonObj.length === 0) { // no match
        return { // fallback post
            id: id, // requested id
            title: "Not found", // fallback name
            date: "", // empty birthdate
            contentHtml: "Not Found", // fallback content
            bands: [{0: 'none'}] // fallback bands
        } // end fallback
    } else { // found a match
        return jsonObj[0]; // return that post
    } // end if/else
} // end getPostData
