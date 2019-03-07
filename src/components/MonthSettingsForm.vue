<template>
    <div class="row align-items-center justify-content-center mb-3">
        <b-form inline @submit.prevent>
            <label class="sr-only" for="iFormYearSelect">Year</label>
            <b-form-select 
                class="mb-2 mr-sm-2 mb-sm-0" 
                id="iFormYearSelect" 
                :options="yearOptions" 
                :value="yearSelected"
                v-model="yearSelected"
                @change="changeYear"

                data-test="yearSelector"
            >
            </b-form-select>

            <label class="sr-only" for="iFormMonthSelect">Month</label>
            <b-form-select 
                class="mb-2 mr-sm-2 mb-sm-0" 
                id="iFormMonthSelect" 
                :options="monthOptions"
                :value="monthSelected"
                v-model="monthSelected"
                v-on:change="changeMonth"

                data-test="monthSelector"
            >
            </b-form-select>

            <label class="mr-sm-2" for="iForm2Max">MaxBudget</label>
            <b-input-group prepend="€" class="mb-2 mr-sm-2 mb-sm-0">
                <b-input 
                    id="mb-2 mr-sm-2 mb-sm-0" 
                    placeholder="0.00" 
                    v-model="currentMax"
                    type="number"
                    
                    data-test="maxInput"
                />
            </b-input-group>

            <b-button variant="outline-primary" data-test="maxSet" @click="setMax">Set Max</b-button>
        </b-form>
    </div>
</template>

<script>
export default {
    name: 'MonthSettingsForm',
    data () {
        return {
            yearSelected: null,
            yearSelectedOnce: false,
            yearOptions: [
                { value: null, text: 'Year', disabled: false},
                { value: '1', text: '2018'},
                { value: '2', text: '2019'},
                { value: '3', text: '2020'}
            ],

            monthSelected: null,
            monthSelectedOnce: false,
            monthOptions: [
                { value: null, text: 'Month', disabled: false},
                { value: '1', text: 'January'},
                { value: '2', text: 'February'},
                { value: '3', text: 'March'},
                { value: '4', text: 'April'},
                { value: '5', text: 'May'},
                { value: '6', text: 'June'},
                { value: '7', text: 'July'},
                { value: '8', text: 'August'},
                { value: '9', text: 'September'},
                { value: '10', text: 'October'},
                { value: '11', text: 'November'},
                { value: '12', text: 'December'},
            ],

            currentMax: null
        }
    },
    methods: {
        changeYear () {
            if (!this.yearSelectedOnce && this.yearSelected !== null){
                this.yearOptions.find(item => {return item.value === null}).disabled = true;
            }
            this.$emit('changeYear', this.yearSelected)
        },
        changeMonth () {
            if (!this.monthSelectedOnce && this.monthSelected !== null){
                this.monthOptions.find(item => {return item.value === null}).disabled = true;
            }
            this.$emit('changeMonth', this.monthSelected)
        },
        setMax () {
            this.$emit('setMax', this.currentMax);
        }
    }
}
</script>

<style scoped>

</style>
