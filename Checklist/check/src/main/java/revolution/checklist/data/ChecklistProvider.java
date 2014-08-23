package revolution.checklist.data;

import android.content.ContentProvider;
import android.content.ContentValues;
import android.content.UriMatcher;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.net.Uri;

/**
 * Created by Filipe Mendes on 18/08/2014.
 */
public class ChecklistProvider extends ContentProvider {
    private ChecklistDbHelper mHelper;
    private static final UriMatcher sUriMatcher = buildUriMatcher();

    private static final int CATEGORY = 100;
    private static final int CATEGORY_NAME = 101;
    private static final int TOPIC = 200;
    private static final int TOPIC_NAME = 201;


    private static final UriMatcher buildUriMatcher(){
              /*
        *   * => Represents a string
        *   # => Represents a number
         */

        final UriMatcher matcher = new UriMatcher(UriMatcher.NO_MATCH);
        final String authority = ChecklistContract.CONTENT_AUTHORITY;
        matcher.addURI(authority, ChecklistContract.PATH_CATEGORY, CATEGORY);
        matcher.addURI(authority, ChecklistContract.PATH_CATEGORY + "/*", CATEGORY_NAME);

        matcher.addURI(authority, ChecklistContract.PATH_TOPIC, TOPIC);
        matcher.addURI(authority, ChecklistContract.PATH_TOPIC + "/*", TOPIC_NAME);

        //TODO add more options

        return matcher;
    };

    @Override
    public boolean onCreate() {
        mHelper = new ChecklistDbHelper(getContext());
        return true;
    }

    @Override
    public Cursor query(Uri uri, String[] projection, String selection, String[] selectionArgs, String sortOrder) {
        return null;
    }

    @Override
    public String getType(Uri uri) {
        return null;
    }

    @Override
    public Uri insert(Uri uri, ContentValues values) {
        final SQLiteDatabase db = mHelper.getWritableDatabase();
        final int match = sUriMatcher.match(uri);
        Uri returnURI;

        switch (match){
            case CATEGORY:
                long _id = db.insert(ChecklistContract.CategoryEntry.TABLE_NAME,null,values);
                if(_id > 0)
                    returnURI = ChecklistContract.CategoryEntry.buildCategoryUri(_id);
                else
                    throw new SQLException("Failed to insert row into "+ uri);
                break;
            case TOPIC:
                long _id1 = db.insert(ChecklistContract.TopicEntry.TABLE_NAME,null,values);
                if(_id1 > 0)
                    returnURI = ChecklistContract.TopicEntry.buildTopicUri(_id1);
                else
                    throw new SQLException("Failed to insert row into "+ uri);
                break;
            default:
                throw new UnsupportedOperationException("Unknown URI:"+uri);
        }
        getContext().getContentResolver().notifyChange(uri,null);
        db.close();
        return returnURI;
    }

    @Override
    public int delete(Uri uri, String selection, String[] selectionArgs) {
        final SQLiteDatabase db = mHelper.getWritableDatabase();
        final int match = sUriMatcher.match(uri);
        int deletedRows;

        switch (match){
            case CATEGORY:
                deletedRows = db.delete(ChecklistContract.CategoryEntry.TABLE_NAME,selection,selectionArgs);
                break;
            case TOPIC:
                deletedRows = db.delete(ChecklistContract.TopicEntry.TABLE_NAME,selection,selectionArgs);
                break;
            default:
                throw new UnsupportedOperationException("Unknown URI:"+uri);
        }
        if(selection == null || deletedRows != 0)
            getContext().getContentResolver().notifyChange(uri,null);
        db.close();
        return deletedRows;
    }

    @Override
    public int update(Uri uri, ContentValues values, String selection, String[] selectionArgs) {
        final SQLiteDatabase db = mHelper.getWritableDatabase();
        final int match = sUriMatcher.match(uri);
        int updatedRows;

        switch (match){
            case CATEGORY:
                updatedRows = db.update(ChecklistContract.CategoryEntry.TABLE_NAME,values,selection,selectionArgs);
                break;
            case TOPIC:
                updatedRows = db.update(ChecklistContract.TopicEntry.TABLE_NAME,values,selection,selectionArgs);
                break;
            default:
                throw new UnsupportedOperationException("Unknown URI:"+uri);
        }
        if(updatedRows != 0)
            getContext().getContentResolver().notifyChange(uri,null);
        db.close();
        return updatedRows;
    }
}
