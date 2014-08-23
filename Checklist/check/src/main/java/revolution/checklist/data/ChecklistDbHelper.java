package revolution.checklist.data;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import revolution.checklist.data.ChecklistContract.CategoryEntry;
import revolution.checklist.data.ChecklistContract.TopicEntry;

/**
 * Created by Filipe Mendes on 18/08/2014.
 */
public class ChecklistDbHelper extends SQLiteOpenHelper {

    private static final int DATABASE_VERSION = 1;
    public static final String DATABASE_NAME = "checklist.db";

    public ChecklistDbHelper(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        final String SQL_CREATE_CATEGORY_TABLE = "CREATE TABLE "+ CategoryEntry.TABLE_NAME + "("+
                CategoryEntry._ID + " INTEGER PRIMARY KEY AUTOINCREMENT, " +
                CategoryEntry.COLUMN_NAME + " TEXT UNIQUE NOT NULL, " +
                CategoryEntry.COLUMN_CREATED + " TEXT NOT NULL, " +
                CategoryEntry.COLUMN_UPDATED + " INTEGER, " +          // Booleans do not exist in SQLite
                CategoryEntry.COLUMN_DESCRIPTION + " TEXT NOT NULL, "+
                "UNIQUE (" + CategoryEntry.COLUMN_NAME +") ON CONFLICT IGNORE );";

               /* " FOREIGN KEY ("+ WeatherEntry.COLUMN_LOC_KEY + ") REFERENCES " +
                LocationEntry.TABLE_NAME + " (" + LocationEntry._ID + "), " +

                " UNIQUE ("+ WeatherEntry.COLUMN_DATETEXT + ", " +
                WeatherEntry.COLUMN_LOC_KEY + ") ON CONFLICT REPLACE);"; */
        //TODO FOREIGN KEYS


        final String SQL_CREATE_TOPIC_TABLE = "CREATE TABLE "+ TopicEntry.TABLE_NAME + "("+
                TopicEntry._ID + " INTEGER PRIMARY KEY AUTOINCREMENT, " +
                TopicEntry.COLUMN_NAME + " TEXT UNIQUE NOT NULL, " +
                TopicEntry.COLUMN_DESCRIPTION + " TEXT NOT NULL, " +
                "UNIQUE (" + TopicEntry.COLUMN_NAME +") ON CONFLICT IGNORE );";
        //TODO FOREIGN KEYS

        db.execSQL(SQL_CREATE_TOPIC_TABLE);
        db.execSQL(SQL_CREATE_CATEGORY_TABLE);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        //Como nós não vamos utilizar user generated data e apenas vamos usar a db offline como forma de cache,
        //Podemos simplesmente mandar as DBs abaixo. Caso contrário, teriamos de usar Alter Tables..
        db.execSQL("DROP TABLE IF EXISTS " + CategoryEntry.TABLE_NAME);
        db.execSQL("DROP TABLE IF EXISTS " + TopicEntry.TABLE_NAME);
        onCreate(db);
    }
}
