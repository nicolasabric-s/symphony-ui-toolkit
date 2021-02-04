import * as React from 'react';
import { Dropdown, DropdownOption, Icon, LabelValue, OptionRendererProps, TagRendererProps, Typography } from '../src/components';

const defaultOptions: LabelValue[] = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
];

interface Person {
  label:string;
  value:string;
  name: string;
}

const personSelectorOptions: DropdownOption<Person>[] = [
  {
    label: 'FREQUENT CONTACTS',
    options: [
      { label: 'Emma Jones', value: '1', name: 'a' },
      { label: 'Mehmet Guest', value: '2', name: 'a' },
      { label: 'Charleigh Whitworth', value: '3', name: 'a' },
      { label: 'Hugo Svein', value: '4' , name: 'a'},
      { label: 'Alena Fedrick', value: '5', name: 'a' },
      { label: 'Philip Earl', value: '6' , name: 'a'},
      { label: 'Junita Torrey', value: '7', name: 'a' }
    ]
  }
];

const timeZoneOptions: DropdownOption<LabelValue>[] = [
  { label: '(GMT +03:00) Tanzania', value: '8' },
  { label: '(GMT +03:00) Uganda', value: '9' },
  {
    label: 'United states of America (USA)',
    options: [
      { label: '(GMT -04:00) United states of America (USA) - New York', value: '1' },
      { label: '(GMT -04:00) United states of America (USA) - Detroit', value: '2' },
      { label: '(GMT -04:00) United states of America (USA) - Menominee', value: '3' },
      { label: '(GMT -05:00) United states of America (USA) - Center', value: '4' },
    ]
  }
];

/** Icon custom renderers */
interface Icon {
  displayName:string;
  value:string;
}

const iconData: DropdownOption<Icon>[] = [
  { value: '1', displayName: 'app' },
  { value: '2', displayName: 'bot' },
  { value: '9', displayName: 'hide' },
  { value: '10', displayName: 'link' },
  { value: '3', displayName: 'adjust' },
  { value: '4', displayName: 'archive' },
  { value: '5', displayName: 'cashtag' },
  { value: '6', displayName: 'emoticon' },
  { value: '7', displayName: 'following' },
  { value: '8', displayName: 'flags' }
];

const IconPickerTagRenderer = (props: TagRendererProps<Icon>) => {
  const {data, remove} = props;
  return (
    <div>
      {data.displayName}
      <Icon className="tk-pl-1" iconName={data.displayName} />
      <Icon className="tk-ml-1" iconName="cross" onClick={remove} />
    </div>
  );
};

const IconPickerOptionRenderer = (props: OptionRendererProps<Icon>) => {
  const {data} = props;
  return (
    <div>
      {data.displayName}
      <Icon className="tk-pl-1" iconName={data.displayName} />
    </div>
  );
};


const filterFunction = (icon: Icon, input: string) => {
  return !input || icon.displayName.indexOf(input)>-1 ;
};


const Template = (args) => {
  return (
    <div style={{ minHeight: '160px' }}>
      <Dropdown {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  options: defaultOptions
};

export const Select: React.FC = () => (
  <div>
    <p>Let`s have a look on the different props than can be used to render the dropdown: </p>
    <p className="tk-mt-4">
			With <Typography variant="bold">placeholder</Typography>:
    </p>
    <Dropdown options={defaultOptions} placeHolder="Customized placeholder: Please select an option.." />
    <p className="tk-mt-4">
			With <Typography variant="bold">label</Typography>:
    </p>
    <Dropdown options={defaultOptions} label="Field label" />
    <p className="tk-mt-4">
			Clear selection with <Typography variant="bold">isClearable</Typography>:
    </p>
    <Dropdown options={defaultOptions} isInputClearable />

    <p className="tk-mt-4">
			With <Typography variant="bold">noOptionMessage</Typography> customize the message that the dropdown will display when does not found any item on the list:
    </p>
    <Dropdown options={defaultOptions} noOptionMessage="No options custom message"/>
    <p className="tk-mt-4">
			With <Typography variant="bold">isDisabled</Typography>:
    </p>
    <Dropdown options={defaultOptions} placeHolder="No option available" isDisabled label="Field label" />
    <p className="tk-mt-4">
			With <Typography variant="bold">iconName</Typography> displays the specified icon on the left side of the dropdown:
    </p>
    <Dropdown options={defaultOptions} iconName="app"/>
    <h3 className="tk-mt-4">Grouped option list</h3>
    <Dropdown options={timeZoneOptions} />
    <h2 className="tk-mt-5h">MultiSelect</h2>
    <p>The Dropdown component can handle multiple selections. It is enabled with the <Typography variant="bold">isMultiSelect</Typography> prop:</p>
    <Dropdown options={personSelectorOptions} isMultiSelect placeHolder="Search for People" isInputClearable/>

    <h2 className="tk-mt-5h">Customized selects</h2>
    <p>
    You can easily customize the appearance of the UIToolkit Dropdown and render your own components.
    </p>
    <p className="tk-mt-4">With <Typography variant="bold"> optionRenderer </Typography>prop you can customize the rendering of the option list: </p>
    <Dropdown
      options={iconData}
      optionRenderer={IconPickerOptionRenderer}
      placeHolder="Select an icon.."
    />
    <p className="tk-mt-4">With <Typography variant="bold"> tagRenderer </Typography>prop you can customize the rendering of the selected item/s: </p>
    <Dropdown
      options={iconData}
      tagRenderer={IconPickerTagRenderer}
      optionRenderer={IconPickerOptionRenderer}
      isMultiSelect
      placeHolder="Select an icon.."
    />
    <h2 className="tk-mt-5h">Custom Filter logic</h2>
    <p>If you would like to rewrite the filtration logic from the ground up, simply declare a new <Typography variant="bold"> filterFunction </Typography> to be passed in as a prop:</p>
    <Dropdown
      options={iconData}
      tagRenderer={IconPickerTagRenderer}
      optionRenderer={IconPickerOptionRenderer}
      isMultiSelect
      placeHolder="Select an icon.."
      filterFunction={filterFunction}
    />
  </div>
);

export default {
  title: 'Components/Input/Dropdown (beta)',
  component: Dropdown
};