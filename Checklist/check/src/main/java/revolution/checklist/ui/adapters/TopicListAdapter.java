package revolution.checklist.ui.adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.TextView;

import butterknife.ButterKnife;
import butterknife.InjectView;
import revolution.checklist.R;
import revolution.checklist.data.model.Topic;

/**
 * Created by Filipe Mendes on 02/05/2014.
 */
public class TopicListAdapter extends ArrayAdapter<Topic>{
    private Topic[] mTopics;

    public TopicListAdapter(Context context, Topic[] topics){
        super(context, R.layout.activity_home);
        mTopics = topics;
    }

    @Override
    public int getCount() {
        return mTopics.length;
    }

    @Override
    public View getView(final int position, View convertView, ViewGroup parent) {
        final ViewHolderItem viewHolder;
        final Topic topic = mTopics[position];

        if (convertView == null)
        {
            convertView = LayoutInflater.from(getContext()).inflate(R.layout.row_topic, parent,false);
            viewHolder = new ViewHolderItem(convertView);
            convertView.setTag(viewHolder);

        }else{
            viewHolder = (ViewHolderItem) convertView.getTag();
        }

        viewHolder.name.setText(topic.getName());
        viewHolder.description.setText(topic.getDescription());
        setCheckedState(topic.isChecked(), viewHolder);

        convertView.setBackgroundColor(convertView.getResources().getColor(
                         position % 3 == 0 ? R.color.green
                        : position % 3 == 1 ? R.color.blue
                        : R.color.red));

        viewHolder.checkBox.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                setCheckedState(isChecked,viewHolder);
                topic.setChecked(isChecked);
            }
        });

        return convertView;
    }

    public void setCheckedState(boolean b, ViewHolderItem item)
    {
        item.name.setAlpha(b ? 0.2f : 1f);
        item.description.setAlpha(b ? 0.2f : 1f);
        item.checkBox.setChecked(b);
    }

    public static class ViewHolderItem
    {
        @InjectView(R.id.topic_description) TextView description;
        @InjectView(R.id.topic_title) TextView name;
        @InjectView(R.id.topic_check) CheckBox checkBox;

        public ViewHolderItem(View view) {
            ButterKnife.inject(this, view);
        }
    }
}