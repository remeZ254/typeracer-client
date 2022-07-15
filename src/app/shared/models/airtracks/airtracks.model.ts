export enum AirTracks {
  adir = 'adir',
  barak = 'barak',
  baz = 'baz',
  raam = 'raam',
  sufa = 'sufa',
}

export const getTrackIcon = (airTrack: AirTracks): string => `assets/svg/airtracks/${airTrack}.svg`;
