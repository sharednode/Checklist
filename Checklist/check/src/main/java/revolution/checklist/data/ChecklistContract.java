package revolution.checklist.data;

import android.content.ContentUris;
import android.net.Uri;
import android.provider.BaseColumns;

/**
 * Created by Filipe Mendes on 18/08/2014.
 */
public class ChecklistContract {

    // CONTENT AUTHORITY is a name for the entire content provider, similar to a relationship between a domain name and its website.
    public static final String CONTENT_AUTHORITY = "revolution.checklist";

    // this is the base of all URI's which apps will use to contact the content provider
    public static final Uri BASE_CONTENT_URI = Uri.parse("content://"+CONTENT_AUTHORITY);

    // possible paths (appended to base content URI for possible URI's)
    public static final String PATH_CATEGORY = "category";
    public static final String PATH_TOPIC = "topic";


    // CATEGORY
    public static final class CategoryEntry implements BaseColumns {

        public static final String TABLE_NAME = "category";
        public static final String COLUMN_NAME= "name";
        public static final String COLUMN_DESCRIPTION = "description";
        public static final String COLUMN_CREATED = "created";
        public static final String COLUMN_UPDATED = "updated";

        //TODO array of topics

        public static final Uri CONTENT_URI =
                BASE_CONTENT_URI.buildUpon().appendPath(PATH_CATEGORY).build();

        public static final String CONTENT_TYPE =
                "vnd.android.cursor.dir/" + CONTENT_AUTHORITY + "/" + PATH_CATEGORY;
        public static final String CONTENT_ITEM_TYPE =
                "vnd.android.cursor.item/" + CONTENT_AUTHORITY + "/" + PATH_CATEGORY;

        public static Uri buildCategoryUri(long id) {
            return ContentUris.withAppendedId(CONTENT_URI, id);
        }
    }

    public static final class TopicEntry implements BaseColumns {

        public static final String TABLE_NAME = "topic";
        public static final String COLUMN_NAME= "name";
        public static final String COLUMN_DESCRIPTION = "description";

        //TODO array of links

        public static final Uri CONTENT_URI =
                BASE_CONTENT_URI.buildUpon().appendPath(PATH_TOPIC).build();

        public static final String CONTENT_TYPE =
                "vnd.android.cursor.dir/" + CONTENT_AUTHORITY + "/" + PATH_TOPIC;
        public static final String CONTENT_ITEM_TYPE =
                "vnd.android.cursor.item/" + CONTENT_AUTHORITY + "/" + PATH_TOPIC;

        public static Uri buildTopicUri(long id) {
            return ContentUris.withAppendedId(CONTENT_URI, id);
        }
    }
}
