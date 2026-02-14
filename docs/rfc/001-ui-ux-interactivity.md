# RFC-001: Earthquakes Web UI/UX Interactivity Improvements

**Status:** Draft  
**Author:** Kizara (AI Assistant)  
**Date:** 2026-02-14  
**Target Audience:** Oscar (Architect)  

---

## Problem Statement

The current earthquakesWeb application has limited user interactivity and suboptimal UX in the earthquake visualization experience. Key issues:

1. **Disconnected Interaction**: Map markers are not clickable - users cannot select earthquakes by clicking on the map
2. **Missing Details Panel**: Selected earthquakes only center the map but don't show detailed information in a dedicated panel  
3. **Inconsistent Mobile Experience**: Different behaviors between mobile cards and desktop table without unified interaction patterns
4. **Visual Improvements Needed**: Map height, badge styling, timestamp formatting could be enhanced
5. **State Management Limitations**: Basic Context API may not scale well for complex interactions

**Business Impact**: Poor UX reduces engagement and doesn't leverage the interactive potential of earthquake data visualization.

---

## Current Architecture Analysis

### EarthquakesMapSection Component
```typescript
// Current: Simple wrapper with basic title
export function EarthquakesMapSection() {
  const { earthquakes } = useEarthquakesData();
  return (
    <section className="mx-auto mt-4 text-center font-semibold md:container md:my-8 md:mt-8 md:text-5xl">
      <hr className="mx-auto hidden h-px max-w-7xl border-foreground md:block" />
      <h2 className="my-4 text-xl md:my-8 md:mb-8 md:text-5xl">Últimos sismos</h2>
      <EarthquakesMap earthquakes={earthquakes} />
    </section>
  );
}
```

**Issues:**
- No integration with details panel
- Fixed layout doesn't accommodate details view
- Title styling could be more responsive

### EarthquakeCardList Component
```typescript
// Current: Mobile-only card list with selection
export function EarthquakeCardList({ earthquakes }: { earthquakes: EarthquakeProps[] }) {
  const { selected, setSelected } = useEarthquakesData();
  return (
    <div className="flex flex-col gap-2 px-4 py-4">
      {earthquakes.map((eq) => (
        <EarthquakeCard
          key={`${eq.magnitude}-${eq.lat}-${eq.lng}-${eq.date}-${eq.time}`}
          earthquake={eq}
          isSelected={selected === eq}
          onSelect={() => setSelected(eq)}
        />
      ))}
    </div>
  );
}
```

**Issues:**
- Only visible on mobile (`md:hidden`)
- No integration with map marker clicks
- Limited information displayed in cards

### EarthquakesMap Component
```typescript
// Current: Map with markers but no click handling
export function EarthquakesMap(props: EarthquakesMapProps) {
  const { earthquakes } = props;
  const { selected } = useEarthquakesData();
  // ... implementation with Markers component
}
```

**Issues:**
- Markers don't handle click events to set selection
- Fixed height values (65vh mobile, 96 md, 500px lg) 
- No details panel integration

### Current State Management
```typescript
// Context API with basic state
type EarthquakesDataContextType = {
  earthquakes: EarthquakeProps[];
  setEarthquakes: (prev: any) => void;
  selected: EarthquakeProps | null;
  setSelected: (prev: any) => void;
};
```

**Issues:**
- No UI state management (details panel open/closed, view modes)
- Type safety issues (`any` types)
- No derived state or computed properties

---

## Proposed Solution

### 1. Enhanced Interactive Map + Details Panel Layout

**New Layout Structure:**
```
┌─────────────────────────────────────────┐
│              Page Title                  │
├─────────────────┬───────────────────────┤
│                 │                       │
│   EarthquakesMap│   DetailsPanel        │
│   (70% width)   │   (30% width)         │
│                 │   - Selected Info     │
│                 │   - Actions           │
│                 │   - Related Data      │
│                 │                       │
└─────────────────┴───────────────────────┘
│          EarthquakeCardList             │
│          (Mobile only, below map)       │
└─────────────────────────────────────────┘
```

### 2. Clickable Map Markers

**Enhanced Markers Component:**
- Add click event handlers to AdvancedMarker components
- Integrate with selection state management  
- Visual feedback for selected markers (different styling)
- Hover effects for better UX

### 3. Unified Details Panel

**New DetailsPanel Component:**
- Shows detailed information for selected earthquake
- Actions: Share, Save, Show on Full Map
- Related earthquakes in area
- Historical data for location
- Collapsible on mobile, persistent on desktop

### 4. Visual Improvements

**Map Height Optimization:**
```css
/* Current: Fixed heights */
h-[65vh] md:h-96 lg:h-[31.25rem]

/* Proposed: Responsive with panel consideration */
h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[600px]
```

**Enhanced Badges:**
- Animated magnitude indicators
- Severity-based pulsing animations
- Better color contrast ratios
- Accessible focus states

**Improved Timestamps:**
- Relative time ("2 hours ago") with absolute on hover
- Time zone awareness
- Formatted for readability

### 5. State Management Strategy: Zustand

**Why Zustand over Context API:**
- Better performance (selective subscriptions)
- Built-in TypeScript support
- Smaller bundle size
- Easier testing
- No provider wrapping needed

**Proposed State Structure:**
```typescript
interface EarthquakeStore {
  // Data
  earthquakes: EarthquakeProps[];
  selected: EarthquakeProps | null;
  
  // UI State
  detailsPanelOpen: boolean;
  mapHeight: 'compact' | 'standard' | 'expanded';
  viewMode: 'map' | 'list' | 'split';
  
  // Actions
  setEarthquakes: (earthquakes: EarthquakeProps[]) => void;
  selectEarthquake: (earthquake: EarthquakeProps | null) => void;
  toggleDetailsPanel: () => void;
  setMapHeight: (height: 'compact' | 'standard' | 'expanded') => void;
  setViewMode: (mode: 'map' | 'list' | 'split') => void;
  
  // Computed
  nearbyEarthquakes: (earthquake: EarthquakeProps) => EarthquakeProps[];
  sortedEarthquakes: EarthquakeProps[];
}
```

---

## Component Breakdown & Implementation Phases

### Phase 1: Enhanced State Management (1 week)
**Goal:** Replace Context API with Zustand store

**Tasks:**
1. Install and configure Zustand
2. Create `stores/earthquakeStore.ts`
3. Migrate existing components to use Zustand
4. Add UI state management
5. Unit tests for store actions and selectors

**Files Changed:**
- `src/stores/earthquakeStore.ts` (new)
- `src/components/providers/EarthquakesDataProvider/` (remove)
- All components using `useEarthquakesData` hook

**Acceptance Criteria:**
- [ ] All existing functionality works with Zustand
- [ ] No Context providers needed
- [ ] Type safety improvements
- [ ] Performance improvements measurable

### Phase 2: Clickable Map Markers (1 week)
**Goal:** Make map markers interactive with selection

**Tasks:**
1. Enhance `Markers.tsx` with click handlers
2. Add visual states for selected/hover markers
3. Integrate with Zustand selection actions
4. Add keyboard navigation support
5. Update MagnitudeIndicator for selected state

**Files Changed:**
- `src/features/earthquakes-map/Markers.tsx`
- `src/components/ui/magnitude-indicator/MagnitudeIndicator.tsx`
- `src/components/ui/magnitude-indicator/helpers.ts`

**Acceptance Criteria:**
- [ ] Clicking map markers selects earthquake
- [ ] Selected markers have distinct visual state
- [ ] Keyboard accessible (Tab navigation, Enter to select)
- [ ] No performance degradation with many markers

### Phase 3: Details Panel Component (1.5 weeks)
**Goal:** Create comprehensive details panel for selected earthquakes

**Tasks:**
1. Design and implement `DetailsPanel` component
2. Create responsive layout with map + panel
3. Add earthquake details formatting
4. Implement actions (share, full map, etc.)
5. Add related earthquakes section
6. Mobile responsiveness

**Files Created:**
- `src/components/panels/details-panel/DetailsPanel.tsx`
- `src/components/panels/details-panel/EarthquakeDetails.tsx`
- `src/components/panels/details-panel/RelatedEarthquakes.tsx`
- `src/components/panels/details-panel/ActionBar.tsx`

**Files Changed:**
- `src/components/sections/earthquakes-map-section/EarthquakesMapSection.tsx`

**Acceptance Criteria:**
- [ ] Details panel shows complete earthquake information
- [ ] Panel responsive on mobile (collapsible)
- [ ] Share functionality works
- [ ] Related earthquakes calculated and displayed
- [ ] Smooth animations and transitions

### Phase 4: Visual Improvements (1 week)
**Goal:** Polish visual design and user experience

**Tasks:**
1. Optimize map heights for better layout
2. Enhanced badge animations and styling
3. Improved timestamp formatting
4. Better color contrast and accessibility
5. Loading states and error handling
6. Micro-interactions and polish

**Files Changed:**
- `src/features/earthquakes-map/EarthquakesMap.tsx`
- `src/components/ui/magnitude-indicator/`
- `src/components/widgets/earthquake-card/`
- Global CSS and Tailwind config

**Acceptance Criteria:**
- [ ] WCAG 2.1 AA compliance
- [ ] Smooth animations without performance impact
- [ ] Better mobile experience
- [ ] Loading states for all async operations

### Phase 5: Integration & Testing (0.5 weeks)
**Goal:** Final integration, testing, and documentation

**Tasks:**
1. Integration testing across components
2. Performance optimization
3. Documentation updates
4. Bug fixes and edge cases

**Acceptance Criteria:**
- [ ] All components work together seamlessly
- [ ] No regressions in existing functionality
- [ ] Documentation updated
- [ ] Performance benchmarks met

---

## Testing Approach

### Unit Tests
**Target: >90% coverage for new components**

1. **Store Tests** (Zustand)
   ```typescript
   describe('earthquakeStore', () => {
     test('selectEarthquake updates selection', () => {})
     test('nearbyEarthquakes returns correct results', () => {})
     test('toggleDetailsPanel changes panel state', () => {})
   })
   ```

2. **Component Tests** (React Testing Library)
   ```typescript
   describe('DetailsPanel', () => {
     test('displays earthquake details correctly', () => {})
     test('handles click events on actions', () => {})
     test('shows related earthquakes', () => {})
   })
   ```

3. **Interactive Tests**
   ```typescript
   describe('Markers interaction', () => {
     test('clicking marker selects earthquake', () => {})
     test('keyboard navigation works', () => {})
     test('selected marker has correct styling', () => {})
   })
   ```

### Integration Tests
1. **Map + Details Panel Integration**
   - Selecting earthquake updates both map and panel
   - Panel actions affect map state correctly
   - Mobile responsive behavior

2. **State Management Integration**
   - Multiple components subscribe to same state
   - Actions from different components work correctly
   - No memory leaks or stale closures

### E2E Tests (Playwright/Cypress)
1. **User Journey: Select Earthquake**
   ```typescript
   test('user can select earthquake from map and view details', async () => {
     // Click map marker
     // Verify details panel opens
     // Verify earthquake information displayed
     // Verify related earthquakes shown
   })
   ```

2. **Responsive Behavior**
   ```typescript
   test('details panel adapts to mobile screen', async () => {
     // Test on mobile viewport
     // Verify collapsible behavior
     // Test touch interactions
   })
   ```

### Performance Tests
1. **Rendering Performance**
   - Map with 100+ markers renders in <2s
   - Panel transitions complete in <300ms
   - Memory usage stable during interactions

2. **Bundle Size Impact**
   - Zustand addition < 10KB
   - New components < 25KB total
   - Tree-shaking working correctly

---

## Acceptance Criteria

### Functional Requirements
- [ ] **Map Interactivity**: Users can click map markers to select earthquakes
- [ ] **Details Panel**: Selected earthquakes show comprehensive details in dedicated panel
- [ ] **Unified Experience**: Consistent behavior between mobile cards, desktop table, and map
- [ ] **Visual Polish**: Improved map height, badges, timestamps, and overall UX
- [ ] **State Management**: Robust Zustand-based state with type safety

### Non-Functional Requirements
- [ ] **Performance**: No degradation in map rendering or interaction speed
- [ ] **Accessibility**: WCAG 2.1 AA compliance maintained
- [ ] **Mobile Experience**: Responsive design works on all screen sizes
- [ ] **Browser Support**: Works on Chrome, Firefox, Safari (latest 2 versions)
- [ ] **Bundle Size**: Total addition < 50KB gzipped

### Technical Requirements
- [ ] **Type Safety**: Full TypeScript coverage with no `any` types
- [ ] **Test Coverage**: >90% unit test coverage for new components
- [ ] **Documentation**: All new components documented with examples
- [ ] **Performance**: Lighthouse performance score >85

---

## Risks & Mitigation

### High Risk
**Risk:** Zustand migration breaks existing functionality  
**Mitigation:** Implement feature flags, comprehensive testing, gradual rollout

**Risk:** Map performance degrades with clickable markers  
**Mitigation:** Benchmark current performance, optimize marker clustering, implement virtualization if needed

### Medium Risk
**Risk:** Mobile UX becomes cluttered with details panel  
**Mitigation:** Extensive mobile testing, collapsible panel design, user testing feedback

**Risk:** Bundle size increase affects load times  
**Mitigation:** Code splitting, tree shaking verification, performance monitoring

### Low Risk
**Risk:** Accessibility regressions  
**Mitigation:** Automated accessibility testing, screen reader testing, focus management

---

## Success Metrics

### User Experience
- [ ] Task completion rate for "find earthquake details" increases by >20%
- [ ] Average session time increases (indicates higher engagement)
- [ ] Mobile bounce rate decreases

### Technical Metrics  
- [ ] Lighthouse performance score maintains >85
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] Bundle size increase < 50KB

### Business Metrics
- [ ] User engagement with earthquake data increases
- [ ] Feature usage analytics show details panel adoption
- [ ] No increase in support requests related to UX issues

---

## Future Considerations

### Phase 6 (Future): Advanced Features
- **Multi-selection**: Allow selecting multiple earthquakes for comparison
- **Filtering UI**: Visual filters for magnitude, date range, location
- **Export Features**: Export earthquake data as CSV/JSON
- **Favorites**: Allow users to save/bookmark earthquakes
- **Notifications**: Browser notifications for new earthquakes in followed areas

### Technical Debt Reduction
- **Component Library**: Extract reusable components to shared library
- **Performance Monitoring**: Add real user monitoring (RUM)
- **A/B Testing**: Framework for testing UI/UX improvements
- **Internationalization**: Prepare for multi-language support

---

## Conclusion

This RFC proposes a comprehensive enhancement to the earthquakesWeb UI/UX that addresses current limitations while setting up a robust foundation for future features. The phased approach allows for incremental improvements with reduced risk, while the Zustand migration provides better performance and developer experience.

The proposed changes align with modern web UX patterns and will significantly improve user engagement with earthquake data visualization. Implementation should take approximately 5 weeks with proper testing and can be rolled out gradually using feature flags.

**Next Steps:**
1. Review and approve this RFC
2. Create detailed implementation tickets for Phase 1
3. Set up development environment with testing frameworks
4. Begin Zustand migration in isolated branch

---

*This RFC is ready for architect review and team feedback. Please provide comments on technical approach, timeline estimates, and any missing considerations.*