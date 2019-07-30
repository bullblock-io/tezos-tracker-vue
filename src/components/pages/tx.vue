<template>
  <div class="main-content">
    <section class="breadcrumbs">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12">
            <div class="page-title ml-2">
              <h2>
                Tezos (XTZ) Blockchain Explorer -
                <span>Transactions page</span>
              </h2>
            </div>

            <ol class="breadcrumb ml-2">
              <li class="breadcrumb-item">
                <router-link :to="{ name: 'index' }">Home</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link :to="{ name: 'txs' }">Transactions page</router-link>
              </li>
              <li class="breadcrumb-item active">ooowU8rXyF8Bq8gY2DucEmaJQ3nTjEvt1EEcphTojtaxDd5Nr3n</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container-fluid">
        <TxInfo :txhash="txhash" />
      </div>
    </section>

    <section>
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12">
            <div class="card ml-2 mr-2">
              <div class="card-header">
                <div class="title">
                  <h3>
                    <span class="text">Transactions list</span>
                  </h3>
                </div>
                <div class="table-filters">
                  <div class="dropdown float-left">
                    <button
                      class="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="thisYear"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >This year</button>
                    <div class="dropdown-menu" aria-labelledby="thisYear">
                      <a class="dropdown-item" href="#">Action</a>
                      <a class="dropdown-item" href="#">Another action</a>
                      <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card-body">
                <table class="transactions-table table table-borderless table-responsive-md">
                  <thead>
                    <tr>
                      <th>From</th>
                      <th>To</th>
                      <th>Amount</th>
                      <th>Fees</th>
                      <th>Gas Limit</th>
                      <th>Storage Limit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <a href="#">fgcjckreux7483d98487d48d848fu48f949</a>
                      </td>
                      <td>
                        <a href="#">fgcjckreux7483d98487d48d848fu48f949</a>
                      </td>
                      <td>12 234</td>
                      <td>12 XTZ</td>
                      <td>12 234</td>
                      <td>12</td>
                    </tr>
                    <tr>
                      <td>
                        <a href="#">fgcjckreux7483d98487d48d848fu48f949</a>
                      </td>
                      <td>
                        <a href="#">fgcjckreux7483d98487d48d848fu48f949</a>
                      </td>
                      <td>12 234</td>
                      <td>12 XTZ</td>
                      <td>12 234</td>
                      <td>12</td>
                    </tr>
                  </tbody>
                </table>

                <ul class="pagination">
                  <li class="page-item">
                    <a class="page-link" href="#">Prev</a>
                  </li>
                  <li class="page-item active">
                    <a class="page-link" href="#">1</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">2</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">3</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">4</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">Next</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TxInfo from "../transactions/transaction";
export default {
  name: "Transaction",
  computed: {
    txhash() {
      return this.$route.params.txhash;
    }
  },
  components: {
    TxInfo
  }
};
</script>

<style />
