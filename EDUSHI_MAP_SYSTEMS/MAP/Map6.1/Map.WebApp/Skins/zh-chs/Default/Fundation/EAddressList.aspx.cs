�}� r �  ��nw�b���a	��� �+^B��}�o�.�|t����ϙ.�-6V�iں�J"�0ǡb�q�qp%�a93�ճ}4w�5��bq�}8)#9��%�~���ā�l����p䠷 �]ߪہT��Zo�@�K������0�,��� ��J���g�KsGG�yC=���*_DT2���
oL��;��gD�(�Y�ĕ?� �Ԣ�x�>�߷�=E���S��n�
���}*ٳKU��1���9�}+�K3���׃X��� �&Fi1d�f�㜅���l���./���8�<fH�#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�rgs e)
        {
            rptEAddressList.DataSource = MemcachedHelper.GetCacheObject("NewEAddressList", delegate() { return new EAddressBLL(EdushiSetting.ECS_DBConnectString).GetNewEAddressList(10); },new TimeSpan(0,10,0)) as DataTable;
            rptEAddressList.DataBind();
        }
    }
}
