package revolution.checklist.ui.fragments;

import android.app.Fragment;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ListView;
import android.widget.ProgressBar;

import butterknife.ButterKnife;
import butterknife.InjectView;
import revolution.checklist.R;
import revolution.checklist.data.model.Category;
import revolution.checklist.ui.adapters.TopicListAdapter;

/**
 * Created by Filipe Mendes on 19/07/2014.
 */
public class TopicsFragment extends Fragment {

    @InjectView(R.id.topics_list)ListView mTopicsListView;
    @InjectView(R.id.pb_loading)ProgressBar mProgressBar;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.fragment_topics, container, false);
        ButterKnife.inject(this,v);
        return v;
    }

    public static TopicsFragment newInstance(){
        return new TopicsFragment();
    }

    public void setAdapter(Category category)
    {
        mTopicsListView.setAdapter(new TopicListAdapter(getActivity(), category.getTopics()));
        mTopicsListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                mTopicsListView.setItemChecked(position, true);
            }
        });

        mProgressBar.setVisibility(View.GONE);
    }
}
