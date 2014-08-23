package revolution.checklist.ui;

import android.app.ActionBar;
import android.app.Activity;
import android.app.Fragment;
import android.app.FragmentTransaction;
import android.os.Bundle;
import android.support.v4.widget.DrawerLayout;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import java.util.List;

import revolution.checklist.R;
import revolution.checklist.data.model.Category;
import revolution.checklist.ui.fragments.TopicsFragment;
import revolution.checklist.ui.util.NavigationDrawerFragment;
import revolution.checklist.web.WebRequest;
import revolution.checklist.web.WebResponse;


public class HomeActivity extends Activity  implements NavigationDrawerFragment.NavigationDrawerCallbacks{

    private String TAG = "MAIN_ACTIVITY";
    // Left Drawer
    private List<Category> mCategories;
    private TopicsFragment mTopicsFragment;

    /**
     * Fragment managing the behaviors, interactions and presentation of the navigation drawer.
     */
    private NavigationDrawerFragment mNavigationDrawerFragment;
    private CharSequence mTitle;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
        findViews();
        initData();
    }

    public void findViews(){
        mNavigationDrawerFragment = (NavigationDrawerFragment)getFragmentManager().findFragmentById(R.id.navigation_drawer);
        mTitle = getTitle();
        ReplaceFragment( TopicsFragment.newInstance(),false);
    }

    private void setListeners() {
        // Set up the drawer.
        mNavigationDrawerFragment.setUp(
                R.id.navigation_drawer,
                (DrawerLayout) findViewById(R.id.drawer_layout),
                getCategoryTitles());
    }

    private String[] getCategoryTitles(){
        String[] titles = new String[mCategories.size()];
        for(int i=0; i <mCategories.size();i++)
        {
            Category cat = mCategories.get(i);
            String name = cat.getName();
            titles[i] = name;
        }

        return titles;
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        if (!mNavigationDrawerFragment.isDrawerOpen()) {
            // Only show items in the action bar relevant to this screen
            // if the drawer is not showing. Otherwise, let the drawer
            // decide what to show in the action bar.
            getMenuInflater().inflate(R.menu.home, menu);
            restoreActionBar();
            return true;
        }
        return super.onCreateOptionsMenu(menu);
    }

    public void restoreActionBar() {
        ActionBar actionBar = getActionBar();
        actionBar.setNavigationMode(ActionBar.NAVIGATION_MODE_STANDARD);
        actionBar.setDisplayShowTitleEnabled(true);
        actionBar.setTitle(mTitle);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();
        if (id == R.id.action_settings) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    private void initData(){
        //TODO Local Data or download categories from server

        new WebRequest(this).getAllCategories(new WebResponse<List<Category>>() {
            public void onResponse(List<Category> values) {
                mCategories = values;
                setListeners();
                onNavigationDrawerItemSelected(0);
            }
        });
    }



    @Override
    public void onNavigationDrawerItemSelected(int position) {

        // Update content
        mTopicsFragment.setAdapter(mCategories.get(position));

        // Update title
        mTitle = mCategories.get(position).getName();
    }

    public void ReplaceFragment (Fragment frag, boolean addToBackStack){

        if(mTopicsFragment != null && mTopicsFragment == frag)
        {
            Log.d(TAG, "This fragment is already set");
            return;
        }
        FragmentTransaction transaction = getFragmentManager().beginTransaction();
        transaction.replace(R.id.main_content, frag);

        if(addToBackStack)
            transaction.addToBackStack(null);

        transaction.commit();
        mTopicsFragment = (TopicsFragment)frag;
    }
}
