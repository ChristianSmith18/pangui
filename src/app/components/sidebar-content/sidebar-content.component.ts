import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

interface Coordinates {
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-sidebar-content',
  templateUrl: './sidebar-content.component.html',
  styleUrls: ['./sidebar-content.component.scss'],
})
export class SidebarContentComponent implements OnInit {
  locations: Coordinates[] = [
    { latitude: -33.3549351, longitude: -70.7756284 },
    { latitude: -33.369279, longitude: -70.6822936 },
    { latitude: -33.3837492, longitude: -70.5989214 },
    { latitude: -33.3422811, longitude: -70.5706513 },
    { latitude: -33.4035284, longitude: -70.7618302 },
    { latitude: -33.3844504, longitude: -70.6960528 },
    { latitude: -33.4060325, longitude: -70.668944 },
    { latitude: -33.4233405, longitude: -70.5896291 },
    { latitude: -33.4154303, longitude: -70.683542 },
    { latitude: -33.425168, longitude: -70.7665658 },
    { latitude: -33.418836, longitude: -70.9144604 },
    { latitude: -33.4282803, longitude: -70.7144368 },
    { latitude: -33.4520921, longitude: -70.693541 },
    { latitude: -33.4266216, longitude: -70.6442694 },
    { latitude: -33.4474843, longitude: -70.731994 },
    { latitude: -33.4626964, longitude: -70.7207941 },
    { latitude: -33.4543764, longitude: -70.6186649 },
    { latitude: -33.4472567, longitude: -70.5653943 },
    { latitude: -33.515086, longitude: -70.8961306 },
    { latitude: -33.5022882, longitude: -70.7476043 },
    { latitude: -33.4933852, longitude: -70.692763 },
    { latitude: -33.4976093, longitude: -70.6713199 },
    { latitude: -33.4941686, longitude: -70.6616625 },
    { latitude: -33.4899214, longitude: -70.6174798 },
    { latitude: -33.4857978, longitude: -70.5840595 },
    { latitude: -33.5205895, longitude: -70.7061453 },
    { latitude: -33.5297862, longitude: -70.682537 },
    { latitude: -33.5377586, longitude: -70.6605007 },
    { latitude: -33.5364348, longitude: -70.6581825 },
    { latitude: -33.5346575, longitude: -70.5957313 },
    { latitude: -33.5728294, longitude: -70.8538248 },
    { latitude: -33.6402254, longitude: -70.8686244 },
    { latitude: -33.5621644, longitude: -70.7120383 },
    { latitude: -33.5915317, longitude: -70.6733362 },
    { latitude: -33.5954807, longitude: -70.6318297 },
    { latitude: -33.7254145, longitude: -70.6651245 },
    { latitude: -33.6423367, longitude: -70.3669132 },
  ];
  inputText: string = null;

  constructor() {}

  ngOnInit(): void {}

  public selectFrame(): void {
    console.log('Click');
  }

  sendQuery(index: number): void {
    const data = {
      query: this.inputText.trim(),
      ...this.locations[index],
    };
    console.log(data);
  }
}
